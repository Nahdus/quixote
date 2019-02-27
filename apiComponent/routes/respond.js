const router =require('express').Router()
const response =require('../controllers/respond')
router.post('/',response.respond)


module.exports=router