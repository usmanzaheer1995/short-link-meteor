import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import { Links } from './../imports/api/links';
import './../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  //middleware, from connect npm library; same one express uses
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    }
    else {
      next();
    }

  });

  // const petScheme = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 20,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0,
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });
  // petScheme.validate({   
  //     age: 5,
  //     contactNumber: '1234'
  // });

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min:1
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });

  // employeeSchema.validate({
  //   name: "Usman",
  //   hourlyWage: 5,
  //   email: 'usman@example'
  // })
});
