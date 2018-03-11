//
// Entry point
//

'use strict';

const Alexa = require('alexa-sdk');
const Launch = require('./intents/Launch');
const Next = require('./intents/Next');
const Previous = require('./intents/Previous');
const utils = require('./utils');
const resources = require('./resources');

const APP_ID = 'amzn1.ask.skill.c419b899-a72e-4fd5-bc1c-9c153f4a1465';

// General (no state) handlers
// Handles initial search from customer
const handlers = {
  'NewSession': function() {
    // Everything funnels to launch
    this.emit('LaunchRequest');
  },
  'LaunchRequest': Launch.handleIntent,
  'AMAZON.NextIntent': Next.handleIntent,
  'AMAZON.PreviousIntent': Previous.handleIntent,
  'Unhandled': function() {
    utils.emitResponse(this, null, null, this.t('UNKNOWN_INTENT'), this.t('UNKNOWN_INTENT_REPROMPT'));
  },
};

exports.handler = function(event, context, callback) {
  const AWS = require('aws-sdk');
  AWS.config.update({region: 'us-east-1'});

  const alexa = Alexa.handler(event, context);

  if (!process.env.NOLOG) {
    console.log(JSON.stringify(event));
  }

  // Best practice in production is to validate the ID
  // However the Alexa development portal currently has a bug
  // where the wrong ID is being sent - hence we don't check in
  // our test environment
  if (!process.env.TEST) {
    alexa.appId = APP_ID;
  }
  alexa.resources = resources.languageStrings;
  alexa.registerHandlers(handlers);
  alexa.dynamoDBTableName = 'MyVideoSkill';
  alexa.execute();
};
