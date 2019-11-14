const requireLogin = require('../middlewares/requireLogin');
const processSurveys= require('../surveys/processSurveys')

module.exports=(app)=>{
    app.post('/api/surveys',requireLogin,(req,res)=>{
        processSurveys.createNewSurvey(req,res)
    })

    app.post('/api/surveys/webhook',(req,res)=>{
        processSurveys.handleWebHook(req,res)
    })

    app.get('/api/surveys',requireLogin,(req,res)=>{
        processSurveys.getSurveyList(req,res)
    })

    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send("Thanks for voting")
    })
}