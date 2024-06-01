import React, { useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import CallingFunctionality from '../../socket/CallingFunctionality';
import { useCallContext } from '../../../context/CallContext';
export default function Header() {
const {selectedConversation}=useConversation()
const {call,setCall}=useCallContext()
const handleCall=()=>{
  setCall(true)
}
  return (
    <div>
        <div className="navbar z-50  h-12   bg-green-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 text-white justify-between -mt-4"  style={{minHeight:"3rem"}} >
            <div className='flex flex-row w-32 justify-around '>
        <div className="chat-image avatar ">
    <div className="w-7 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={selectedConversation.profilePic} />
    </div>
  </div>
  <a className=" text-xl cursor-pointer mb-1">{selectedConversation.fullName}</a>
            </div>
  <div className='flex flex-row w-14 justify-between mr-3'>
    <IoVideocam onClick={handleCall}/>
{call &&   <CallingFunctionality/>}

  <IoCall className='w-5 h-5 cursor-pointer' />
  </div>
</div>
    </div>
  )
}




