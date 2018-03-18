//
// Handles playing the selected video
//

'use strict';

module.exports = {
  handleIntent: function() {
    // Get the song, either from a token or from an intent slot
    const video = getVideoIndex(this);
    if ((video === undefined) ||
        isNaN(video) ||
        (video > this.attributes.videos.length)) {
      this.response.speak(this.t('SELECTED_NOSELECTION'));
    } else {
      this.response.playVideo(this.attributes.videos[video].url,
        this.attributes.videos[video].metadata);
    }

    this.emit(':responseReady');
  },
};

function getVideoIndex(context) {
  let index;

  if (context.event.request.token) {
    const songs = context.event.request.token.split('.');
    if (songs.length === 2) {
      index = songs[1];
    }
  } else {
    // Look for an intent slot
    if (context.event.request.intent.slots && context.event.request.intent.slots.Number
      && context.event.request.intent.slots.Number.value) {
      index = parseInt(context.event.request.intent.slots.Number.value);

      if (isNaN(index)) {
        index = undefined;
      } else {
        // Turn into zero-based index
        index--;
      }
    }
  }

  return index;
}
