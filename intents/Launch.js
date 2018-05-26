//
// Handles bet of a single number - "Bet on five"
//

'use strict';

const Alexa = require('alexa-sdk');
// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
// const makeImage = Alexa.utils.ImageUtils.makeImage;
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = {
  handleIntent: function() {
    // And play a video!
    loadVideos((videos) => {
      this.attributes.videos = videos;
      if (videos) {
        // check if the device has a video screen
        if (this.event.context &&
            this.event.context.System.device.supportedInterfaces.Display) {
          const listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
          const listTemplateBuilder = new Alexa.templateBuilders.ListTemplate1Builder();
          let i;

          for (i = 0; i < videos.length; i++) {
            listItemBuilder.addItem(null, 'song.' + i,
              makePlainText(videos[i].metadata.title),
              makePlainText(videos[i].metadata.subtitle));
          }

          const listItems = listItemBuilder.build();
          const listTemplate = listTemplateBuilder
            .setToken('listToken')
            .setTitle('Available videos')
            .setListItems(listItems)
            .build();
          this.response.speak(this.t('LAUNCH_WELCOME'))
            .listen(this.t('LAUNCH_WELCOME_REPEAT'))
            .renderTemplate(listTemplate);
        } else {
          // handle error of not having a video screen to play
          this.response.speak(this.t('LAUNCH_NOSCREEN'));
        }

        // Just play the first one for now
        // this.response.playVideo(videos[0].url, videos[0].metadata);
      } else {
        this.response.speak(this.t('LAUNCH_NOLIST'));
      }

      this.emit(':responseReady');
    });
  },
};

function loadVideos(callback) {
  s3.getObject({Bucket: 'garrett-alexa-usage/videos', Key: 'Videos.txt'}, (err, data) => {
    if (err) {
      // Sorry, no videos for you
      console.log(err.stack);
      callback();
    } else {
      const videos = JSON.parse(data.Body.toString('ascii'));

      // This has to be an array with at least one entry, else return undefined
      if ((videos instanceof Array) && (videos.length > 0)) {
        videos.sort((a, b) => (b.timestamp - a.timestamp));
        callback(videos);
      } else {
        callback(undefined);
      }
    }
  });
}
