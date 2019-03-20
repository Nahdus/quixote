const router =require('express').Router()
const response =require('../controllers/respond')



router.post('/respond',response.respond)
router.post('/raw',response.process)
router.post('/getSimilarity',response.getSimilarity)
router.post('/train',response.train)
router.post('/identifyIntent',response.identifyIntent)
router.post('/clear',response.clearTraining)
router.post('/languageGuess',response.languageGuess)
router.post('/analyseSentiment',response.analyseSentiment)


module.exports=router