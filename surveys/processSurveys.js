const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("./emailTemplates/surveyTemplate");
const keys = require("../config/keys");

const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

async function createNewSurvey(req, res) {
  const { title, subject, body, recipients } = req.body;

  if (req.user.credits < 1) {
    res.status(403).send({ error: "Not enough credits" });
  }

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const redirectionUrl = {
    yesUrl:
      keys.clientRedirectionBaseUrl + "/api/surveys/" + survey.id + "/yes",
    noUrl: keys.clientRedirectionBaseUrl + "/api/surveys/" + survey.id + "/no"
  };

  const mailer = new Mailer(survey, surveyTemplate(survey, redirectionUrl));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
}

function handleWebHook(req, res) {
  console.log(req.body);
  const events = _.map(req.body, event => {
    if (event.url) {
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(new URL(event.url).pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    }
  });
  const compactEvents = _.compact(events);
  const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
  console.log("UNIQUE EVENT CATCHED", uniqueEvents);
  uniqueEvents.forEach(function(event) {
    Survey.updateOne(
      {
        _id: event.surveyId,
        recipients: { $elemMatch: { email: event.email, responded: false } }
      },
      { $inc: { [event.choice]: 1 }, $set: { "recipients.$.responded": true } ,lastResponded:new Date()}
    ).exec();
  });
  res.send({});
}

module.exports = {
  createNewSurvey: createNewSurvey,
  handleWebHook: handleWebHook
};
