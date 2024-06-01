import express from 'express'
import { userLogOut,userLogin,userSignup } from '../controllers/authController.js'
const router=express.Router()

router.post("/signup",userSignup)
router.post('/login',userLogin)
router.post('/logout',userLogOut)

export default router