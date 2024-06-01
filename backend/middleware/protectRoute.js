import jwt from 'jsonwebtoken'
import { User } from '../model/userModel.js'

const protectRoute = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];  
    console.log(token)
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded)
    // Find the user by ID and exclude password
    const user = await User.findById(decoded.userid).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    // Attach user to the request object
    req.user = user;
    console.log(user)
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error.message);
    res.status(401).json({ error: error.message });
  }
};
export default protectRoute