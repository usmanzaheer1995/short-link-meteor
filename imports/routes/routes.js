import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router as Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from './../ui/signup';
import Link from './../ui/link';
import NotFound from './../ui/notfound';
import Login from './../ui/login';

const history = createBrowserHistory();

//which pages an unauthenticated user can go to i.e. public pages
const unauthenticatedPages = ['/', '/signup'];

//which pages an authenticated user can go to i.e. private pages
const authenticatedPages = ['/link'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isAuthenticated && isUnauthenticatedPage) {
        history.replace('/link');
    }
    else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
}

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/link" render={() => {
                return !Meteor.userId() ? <Redirect to="/" /> : <Link />  //if user is not loggedin i.e. userid doesnt exist, go back to login page.
            }} />
            <Route path="/signup" render={() => {
                return Meteor.userId() ? <Redirect to="/link" /> : <Signup />
            }} />
            <Route exact path="/" render={() => {
                return Meteor.userId() ? <Redirect to="/link" /> : <Login />
            }} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);