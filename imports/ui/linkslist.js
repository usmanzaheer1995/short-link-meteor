import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from './../api/links';
import LinksListItem from './linkslistitem';

export default class LinksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            let links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
        });
    }
    componentWillUnmount() {
        console.log('component will unmount linkslist.');
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if (this.state.links.length <= 0) {
            return (
                <div className="item">
                    <p className="item__status-message">There are currently no links found.</p>
                </div>
            )
        }
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);  //this adds complete path i.e http://localhost:3000/link._id
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
        })
    }

    render() {
        return (
            <div>
                <FlipMove duration={750} easing="ease-out" maintainContainerHeight="true">
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}