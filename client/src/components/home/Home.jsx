import React from 'react'
import Sidebar from './sidebar/Sidebar'
import useConversation from '../zustand/useConversation'
import Messages from './messageContainer/Messages'
import { useCallContext } from '../../context/CallContext'
import CallingFunctionality from '../socket/CallingFunctionality'
export default function Home() {
  const { selectedConversation}=useConversation()
  const {call}=useCallContext()
  const authUser=JSON.parse(localStorage.getItem('user'))
  
  return (
    <>
  {call? 

<CallingFunctionality/>
    :
    <div className='max-h-3/5 p-10  xl:w-94  xl:flex lg:flex md:flex flex-row     xl:justify-between lg:justify-items-start lg:m-30  xl:m-20' style={{maxHeight:"30rem"}} >
        <Sidebar/>
        <div className="divider lg:divider-horizontal" ></div> 
        {!selectedConversation? 
 <div className='mr-72 bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 xl:w-11/12 lg:w-11/12 md:w-10/12 sm:w-9/12 text-white font-extrabold flex flex-col justify-center items-center' >
 <h2>Welcome {authUser.fullName}</h2>
 <p>Select Any Chat to start a conversation</p>
     </div>
      :  
      <Messages/>
      }
    </div>
  }
             </>
  )
}
