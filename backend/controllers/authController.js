import bcrypt from "bcryptjs";
import { User } from "../model/userModel.js";
// import { generateTokenAndSetCookie } from "../utils/generateWebToken.js";
import jwt from 'jsonwebtoken'
export const userSignup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      await newUser.save();
    //   const token=generateTokenAndSetCookie(newUser._id,res)
    const newuserid=newUser.id
    const token= jwt.sign({newuserid},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        token: token
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || " "
    );
    if (!user || !correctPassword) {
      //    return res.status(400).json({error:"username or password is not correct"})
    }
    if (user && correctPassword) {
        // const token=generateTokenAndSetCookie(user._id, res)
        const userid=user._id
        const token=jwt.sign({userid},process.env.JWT_SECRET,{
            expiresIn:'15d'
        })
      await res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        token:token
      });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
  }
};
export const userLogOut = (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "successfully logout" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
