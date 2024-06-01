import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../../context/SocketContext'
export default function Conversation({conversations}) {
  const {selectedConversation,setSelectedConversation}=useConversation()
  const isSelected=selectedConversation?._id===conversations._id
  const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversations._id);
console.log(isOnline)
  return (
    <>
    <div className={`flex flex-row xl:max-w-96 lg:max-w-80 md:max-w-60 hover:bg-blue-100  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 hover:rounded-3xl ${isSelected?"hover:bg-blue-100  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 hover:rounded-3xl":" "}`} onClick={()=>setSelectedConversation(conversations)}>
    <div className={`avatar ${isOnline ? "online" : ""}`}>
  <div className="w-12 rounded-full">
    <img  src={conversations?.profilePic||null}/>
  </div>
</div>
<div className='ml-5 text-white text-lg '><p>{conversations?.fullName||'name'}</p></div>
    </div>
    <div className='divider mt-0 mb-0'></div>
    </>
  )
}
 