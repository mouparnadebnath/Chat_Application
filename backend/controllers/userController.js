import { User } from "../model/userModel.js"

const getUser=async(req,res)=>{
try {
    const loggedinUsers=req.user._id
    console.log(loggedinUsers)
    const filtereduser= await User.find({_id:{$ne:loggedinUsers}}).select("-password")
    if (!filtereduser) {
        return res.status(404).json({ message: 'User not found' });
        
    }
    res.status(200).json(filtereduser);
    console.log(filtereduser)
} catch (error) {
    console.log('error while getting user',error.message)
    res.status(500).json({error:error.message})
}
}
export default getUser