import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

//publications can only be run on server
if (Meteor.isServer) {
    //we use es5 function instead of arrow function is because we need access to 'this' keyword
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}

//methods must be defined to both server and client to keep both in sync
Meteor.methods({
    //key has to be unique
    //naming convention: resourse.action
    'links.insert'(url) {  //this is same as 'links.insert': function()
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        new SimpleSchema({
            url: {
                type: String,
                regEx: SimpleSchema.RegEx.Url,
                label: 'Your link'
            }
        }).validate({ url });   //error will be thrown automatically due to the simple-scheme-config file

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },

    'links.setVisibility'(_id, visibilty) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1,
            },
            visibilty: {
                type: Boolean
            }
        }).validate({ _id, visibilty });
        Links.update({ _id, userId: this.userId }, { $set: { visible: visibilty } });
    },

    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1,
            },
        }).validate({ _id });

        Links.update({ _id }, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },

            $inc: {
                visitedCount: 1
            }
        });
    }
});
