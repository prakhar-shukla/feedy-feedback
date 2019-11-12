const requireLogin = require('../middlewares/requireLogin');
const processSurveys= require('../surveys/processSurveys')

module.exports=(app)=>{
    app.post('/api/surveys',requireLogin,(req,res)=>{
        processSurveys.createNewSurvey(req,res)
    })

    app.post('api/surveys/webhook',(req,res)=>{
        console.log("REQUEST RECEIVED WEBHOK")
        console.log(req.body);
        res.send({});
    })
}