const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')

router.get('/getusers',usercontroller.getallUsers)
//router.post('/adduser',usercontroller.addUser)
router.put('/edituser',usercontroller.editUser)
//router.delete('/deleteuser,usercontroller.deleteUser)




module.exports = router;