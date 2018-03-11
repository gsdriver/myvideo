//
// Utility functions
//

'use strict';

const Alexa = require('alexa-sdk');
// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

module.exports = {
  emitResponse: function(context, error, response, speech, reprompt, cardTitle, cardText) {
    // If this is a Show, show the background image
    if (context.event.context &&
        context.event.context.System.device.supportedInterfaces.Display) {
      // Add background image
      const builder = new Alexa.templateBuilders.BodyTemplate6Builder();
      const hand = context.attributes[context.attributes.currentHand];
      const imageURL = (hand.doubleZeroWheel)
        ? 'http://garrettvargas.com/img/DoubleZeroTable.jpg'
        : 'http://garrettvargas.com/img/SingleZeroTable.jpg';

      const template = builder.setTitle('')
                  .setBackgroundImage(makeImage(imageURL))
                  .setTextContent(makePlainText(''))
                  .setBackButtonBehavior('HIDDEN')
                  .build();

      context.response.renderTemplate(template);
      context.attributes.display = true;
    } else {
      context.attributes.display = undefined;
    }

    if (error) {
      const res = require('./' + context.event.request.locale + '/resources');
      console.log('Speech error: ' + error);
      context.response.speak(error)
        .listen(res.ERROR_REPROMPT);
    } else if (response) {
      context.response.speak(response);
    } else if (cardTitle) {
      context.response.speak(speech)
        .listen(reprompt)
        .cardRenderer(cardTitle, cardText);
    } else {
      context.response.speak(speech)
        .listen(reprompt);
    }

    context.emit(':responseReady');
  },
};
