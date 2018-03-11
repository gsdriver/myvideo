//
// Utility functions
//

'use strict';

// const Alexa = require('alexa-sdk');
// utility methods for creating Image and TextField objects
// const makePlainText = Alexa.utils.TextUtils.makePlainText;
// const makeImage = Alexa.utils.ImageUtils.makeImage;
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = {
  emitResponse: function(context, error, response, speech, reprompt, cardTitle, cardText) {
/*
    // If this is a Show, show the background image
    if (context.event.context &&
        context.event.context.System.device.supportedInterfaces.Display) {
      // Add background image
      const builder = new Alexa.templateBuilders.BodyTemplate6Builder();
      const imageURL = 'http://garrettvargas.com/img/SingleZeroTable.jpg';

      const template = builder.setTitle('')
                  .setBackgroundImage(makeImage(imageURL))
                  .setTextContent(makePlainText(''))
                  .setBackButtonBehavior('HIDDEN')
                  .build();

      context.response.renderTemplate(template);
    }
*/
    if (error) {
      console.log('Speech error: ' + error);
      context.response.speak(error)
        .listen(this.t('ERROR_REPROMPT'));
    } else if (response) {
      context.response.speak(response);
    } else if (cardTitle) {
      context.response.speak(speech)
        .listen(reprompt)
        .cardRenderer(cardTitle, cardText);
    } else if (speech) {
      context.response.speak(speech)
        .listen(reprompt);
    }

    context.emit(':responseReady');
  },
  loadVideos: function(callback) {
    s3.getObject({Bucket: 'garrett-alexa-usage/videos', Key: 'Videos.txt'}, (err, data) => {
      if (err) {
        // Sorry, no videos for you
        console.log(err.stack);
        callback();
      } else {
        const videos = JSON.parse(data.Body.toString('ascii'));

        // This has to be an array with at least one entry, else return undefined
        if ((videos instanceof Array) && (videos.length > 0)) {
          videos.sort((a, b) => (a.timestamp - b.timestamp));
          callback(videos);
        } else {
          callback(undefined);
        }
      }
    });
  },
};
