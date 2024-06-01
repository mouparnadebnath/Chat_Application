import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { userLogout } from '../../../../api/logoutApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Logout() {
const navigate=useNavigate()
const notify = () =>
toast.success("Logged out Successfully", {
  theme: "dark",
  position: "top-center",
});
  const handleLogout=async()=>{
userLogout()
console.log('logged out successfully')
notify()
setTimeout(() => {
    navigate('/login')
}, 2000);
}
  
  return (
    <div className='mt-1'>
<RiLogoutCircleLine className='w-4 h-4 hover:w-5 hover:h-5 fill-white cursor-pointer' onClick={handleLogout}/>
<ToastContainer position='top-center' theme='dark'/>
    </div>
  )

}