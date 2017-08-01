import { Meteor } from 'meteor/meteor';
//import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { onAuthChange, routes } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  //!! means flipping value twice which takes the falsy or truthy value and converts it into boolean
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible',true);
  ReactDOM.render(routes, document.getElementById('app'));
}) 
