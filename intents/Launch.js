//
// Handles bet of a single number - "Bet on five"
//

'use strict';

const utils = require('../utils');

module.exports = {
  handleIntent: function() {
    const reprompt = this.t(LAUNCH_REPROMPT);
    let speech = this.t(LAUNCH_WELCOME);

    speech += reprompt;
    utils.emitResponse(this, null, null, speech, reprompt);
  },
};
