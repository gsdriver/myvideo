//
// Handles bet of a single number - "Bet on five"
//

'use strict';

const utils = require('../utils');

module.exports = {
  handleIntent: function() {
    // Just go to the next video
    this.attributes.currentVideo++;
    if (this.attributes.currentVideo >= this.attributes.videos.length) {
      // Wrap back to the beginning
      this.attributes.currentVideo = 0;
    }

    this.response.playVideo(this.attributes.videos[this.attributes.currentVideo].url,
      this.attributes.videos[this.attributes.currentVideo].metadata);
    utils.emitResponse(this);
  },
};
