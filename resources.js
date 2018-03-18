// Localized resources

const resources = {
  'en-US': {
    'translation': {
      // From index.js
      'UNKNOWN_INTENT': 'Sorry, I didn\'t get that. Try saying Help.',
      'UNKNOWN_INTENT_REPROMPT': 'Try saying Help.',
      // From Launch.js
      'LAUNCH_NOLIST': 'There was a problem reading a list of videos',
      'LAUNCH_NOSCREEN': 'This skill can only run on a device with a screen',
      'LAUNCH_WELCOME': 'Welcome to Garrett\'s videos. Please select a video to play.',
      'LAUNCH_WELCOME_REPEAT': 'Please select a video to play.',
      // From selected.js
      'SELECTED_NOSELECTION': 'Sorry, I didn\'t get a selection.',
      // From utils.js
      'ERROR_REPROMPT': 'What else can I help with?',
    },
  },
};

module.exports = {
  languageStrings: resources,
};
