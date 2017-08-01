import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
        this.onClose = this.onClose.bind(this);
    }
    onSubmit(e) {
        //const url = this.refs.url.value.trim();
        //const url = this.state.url;
        const { url } = this.state;   //all 3 are correct
        e.preventDefault();
        Meteor.call('links.insert', url, (err, result) => {
            if (!err) {
                this.onClose();
            }
            else {
                this.setState({
                    error: err.reason
                });
            }
        });
        //this.refs.url.value = '';  
    }
    onChange(e) {
        this.setState({ url: e.target.value });
    }
    onClose(){
        this.setState({isOpen: false, url: ``, error: ''})
    }
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onRequestClose={this.onClose}
                    onAfterOpen={() => this.refs.url.focus()}
                    className="boxed-view__box"
                    overlayClassName='boxed-view boxed-view--modal'
                >
                    <h1>Add link.</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.onClose}>Cancel</button>
                    </form>        
                </Modal>
            </div>
        );
    }
}