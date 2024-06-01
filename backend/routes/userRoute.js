import express from 'express'
import getUser from '../controllers/userController.js'
import  protectRoute  from '../middleware/protectRoute.js'
const router=express.Router()
router.get("/",protectRoute,getUser) 
export default router
