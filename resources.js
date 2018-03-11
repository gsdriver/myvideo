// Localized resources

const resources = {
  'en-US': {
    'translation': {
      // From index.js
      'UNKNOWN_INTENT': 'Sorry, I didn\'t get that. Try saying Help.',
      'UNKNOWN_INTENT_REPROMPT': 'Try saying Help.',
      // From Launch.js
      'LAUNCH_NOLIST': 'There was a problem reading a list of videos',
      // From utils.js
      'ERROR_REPROMPT': 'What else can I help with?',
    },
  },
};

module.exports = {
  languageStrings: resources,
};
