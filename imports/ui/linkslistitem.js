import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinksListitem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy); //this is like a global instance i.e. adding keyword 'this' to clipboard variable
        this.clipboard.on('success', (e) => {
            this.setState({ justCopied: true });
            setTimeout(() => {
                this.setState({ justCopied: false });
            }, 1000);
            //this.refs.copy.innerHTML = 'Copied';
        }).on('error', (e) => {
            alert('Unable to copy. Please manually copy the link.')
        });
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return (
            <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
        );
    }

    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--link button--pill" href={this.props.shortUrl} target='_blank'>Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        );
    }
}

LinksListitem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number,
    shortUrl: PropTypes.string.isRequired,

}