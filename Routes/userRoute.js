const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')
router.post('/login',usercontroller.login)
router.get('/getusers',usercontroller.getallUsers)
router.get('/getuser/:id',usercontroller.getUserData)
router.post('/createuser',usercontroller.addUser)
router.put('/edituser',usercontroller.editUser)
router.delete('/deleteuser/:id',usercontroller.deleteUser)




module.exports = router;