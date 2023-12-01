const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')

router.get('/getusers',usercontroller.getallUsers)




module.exports = router;