const express = require("express");
const router = express.Router();
const {register} = require("../controllers/register.controllers");
const access = require('../controllers/login.controllers');
const surveys = require('../controllers/survey.controllers');
const survQuest = require('../controllers/survQuestions');
const question = require('../controllers/questions.controller')
//aUTHENTICATION
router.post("/signup/:usertype", register);
router.post('/signin', access.login);

// router.post('/insert/:userid', survQuest.surveyList);
router.post("/addSurvey", survQuest.addSurvey);
router.post("/addQna", survQuest.addQna);
//SURVEY/QUESTION ROUTERS
// router.put('/update-status/:survid', surveys.updateStatus);
router.get("/surveylist", survQuest.getAllsurvey);
router.get("/takeSurvey/:survey_id", survQuest.getQuesions);
router.put("/updateStatus/:survey_id", survQuest.updateStatus);
router.delete("/deleteSurvey/:survey_id", survQuest.deleteSurvey)
router.delete("/deleteQna/:survey_id", survQuest.deleteQna)
// router.get('/surveyactive', surveys.getactivesurveys);
// router.get('/status-active/:userid',surveys.filteractive);
// router.get('/status-deactive/:userid',surveys.filterDeActive);




///////////////////////////////////////////////




module.exports = router;
