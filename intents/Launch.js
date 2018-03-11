//
// Handles bet of a single number - "Bet on five"
//

'use strict';

const utils = require('../utils');

module.exports = {
  handleIntent: function() {
    // And play a video!
    utils.loadVideos((videos) => {
      this.attributes.videos = videos;
      if (videos) {
        // Just play the first one for now
        this.response.playVideo(videos[0].url, videos[0].metadata);
      } else {
        this.response.speak(this.t('LAUNCH_NOLIST'));
      }

      utils.emitResponse(this);
    });
  },
};
