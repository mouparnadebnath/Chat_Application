import React, { useEffect, useState } from "react";
import { authenticateSignupUser } from "../../../api/signupApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { set } from "mongoose";

export default function SignUP() {
  // const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [gender, setGender] = useState("")
const navigate=useNavigate()
  const [signup, setSignup] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: gender,
  });

  const handleSignup = (e) => {
    e.target.value;
    setGender(e.target.value)
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };
  useEffect(() => {
    console.log(signup);
  }, [signup]);

  const notify = () =>
    toast.success("Signed Up Successfully", {
      theme: "dark",
      position: "top-center",
    });
  const failure = () =>
    toast.error("User Already exists or Empty Fields", {
      theme: "dark",
      position: "top-center",
    });
 
  const handleUserSignup = async () => {
    const response = await authenticateSignupUser(signup);
    console.log(response);
    if (response) {
      notify();
      navigate('/login')
    }
  if(!response){
failure() 
  }

   
  };
  return (
    <div className="d-flex flex-col">
      <div
        className="h-full p-10 xl:w-3/6 lg:w-9/12 md:w-10/12 sm:w-11/12 bg-green-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 d-flex flex-col justify-center items-center mt-24 mr-auto ml-auto
    "
        style={{ display: "flex" }}
      >
        <h3 className="m-5 text-center text-white text-3xl font-bold">
          Welcome To Chat App,Please SignUp
        </h3>
        <label className="input input-ghost flex items-center gap-2 m-1  w-3/5  bg-transparent ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="w-4 h-4 opacity-70 "
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow text-black font-bold"
            placeholder="Name"
            name="fullName"
            value={signup.fullName}
            onChange={handleSignup}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 m-1  w-3/5 bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow  text-black font-bold"
            placeholder="Username"
            name="username"
            value={signup.username}
            onChange={handleSignup}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 m-1 w-3/5 bg-transparent ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="password"
            className="grow  text-black font-bold"
            placeholder="Password"
            name="password"
            value={signup.password}
            onChange={handleSignup}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 m-1 w-3/5 bg-transparent ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="password"
            className="grow  text-black font-bold"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={signup.confirmPassword}
            onChange={handleSignup}
          />
        </label>
       
        <div className="form-control flex flex-row m-2">
  <label className="label cursor-pointer">
    <span className="label-text m-2 text-white">Male</span> 
    <input type="checkbox"  checked={gender === 'male'} className="checkbox checkbox-accent" name="gender" value="male" onChange={handleSignup}/>
  </label>
  <label className="label cursor-pointer">
    <span className="label-text m-2 text-white">Female</span> 
    <input type="checkbox"  checked={gender === 'female'} className="checkbox checkbox-accent" name="gender" value="female" onChange={handleSignup}/>
  </label>
</div>
        <button
          className="btn btn-ghost text-white text-2xl text-end "
          onClick={handleUserSignup}
        >
          Signup
        </button>
        <div className="text-white"><p>Already a member ? <Link to={'/login'} className="text-blue-600 underline"> Login </Link></p></div>
      </div>
      <ToastContainer theme="dark" position="top-center" />
    </div>
  );
}
