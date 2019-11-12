const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("./emailTemplates/surveyTemplate");
const keys = require("../config/keys")

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

  const redirectionUrl={
    yesUrl:keys.clientRedirectionBaseUrl+"/api/surveys/"+survey.id+"/yes",
    noUrl:keys.clientRedirectionBaseUrl+"/api/surveys/"+survey.id+"/no"
  }

  const mailer = new Mailer(survey, surveyTemplate(survey,redirectionUrl));
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

module.exports = { createNewSurvey: createNewSurvey };
