import React,{useEffect, useState} from 'react'
import { authenticateLoginUser } from '../../../api/loginApi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [loading, setloading] = useState(false)
const navigate=useNavigate()
const [login, setLogin] = useState({
  password:'',
  username:''
})

const handleLogin=(e)=>{
  e.target.value
  setLogin({...login,[e.target.name]:e.target.value})
console.log(login)
}
const failedLoginNotify=() =>
toast.error("Login Failed", {
  theme: "dark",
  position: "top-center",
});
const successfulLoginNotify=() =>
toast.success("Login successful", {
  theme: "dark",
  position: "top-center",
});
useEffect(() => {
console.log(login)
}, [login])
const handleLoginSubmit=async()=>{
  setloading(true)
  const response=await authenticateLoginUser(login)
  console.log(response)
if (response) {
  successfulLoginNotify()
  setTimeout(() => {
    navigate('/')
  }, 2000);
 setLogin('')
 setloading(false)
}else{
failedLoginNotify()
setLogin('')
setloading(false)
}
}

  return (
    <>
    <div className='h-full p-10 xl:w-2/6 lg:w-9/12 md:w-10/12 sm:w-11/12 bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-col justify-center items-center
' style={{margin:"10rem auto 0 auto"}}>

        <h3 className='m-5 text-center text-white text-3xl font-bold'>Login to your Account</h3>
        <label className="input input-bordered flex items-center gap-2 m-5  w-3/5" >
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="Username" onChange={handleLogin} name='username' value={login.username}/>
</label>
        <label className="input input-bordered flex items-center gap-2 m-5 w-3/5" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>

  <input type="password" className="grow" placeholder="Password" onChange={handleLogin} name='password' value={login.password}/>
</label>


<button className='btn btn-ghost text-white text-2xl text-end ' onClick={handleLoginSubmit}>Login</button>
<div className='text-white'><p>Don't have an account ? <Link to={'/signup'} className='text-blue-600 underline'>Signup</Link></p></div>
{loading===true?
<span className="loading loading-spinner loading-lg z-10 "></span>:null
}
    </div>
<ToastContainer theme='dark' position='top-center' className='mb-32'/>


    </>
  )
}
