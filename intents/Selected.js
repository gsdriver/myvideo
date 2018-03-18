//
// Handles playing the selected video
//

'use strict';

module.exports = {
  handleIntent: function() {
    // OK, look at the token and pull out the song
    console.log('Selected video!');

    if (!this.event.request.token) {
      this.response.speak(this.t('SELECTED_NOSELECTION'));
    } else {
      const songs = this.event.request.token.split('.');
      if (songs.length !== 2) {
        this.response.speak(this.t('SELECTED_NOSELECTION'));
      } else {
        const video = parseInt(songs[1]);

        if (isNaN(video) || (video > this.attributes.videos.length)) {
          this.response.speak(this.t('SELECTED_NOSELECTION'));
        } else {
          this.response.playVideo(this.attributes.videos[video].url,
            this.attributes.videos[video].metadata);
        }
      }
    }

    this.emit(':responseReady');
  },
};
