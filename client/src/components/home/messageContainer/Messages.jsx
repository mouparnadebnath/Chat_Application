import React,{useRef,useEffect, useState} from 'react'
import Header from './Header'
import MessageContainer from './MessageContainer'
import useGetMessages from '../../../../api/getMessages'
import MessageInput from './MessageInput'
import useListenMessages from '../../../../api/useListenMessages'
export default function Messages() {
    const {messages,loading}=useGetMessages()
    useListenMessages()
    const messageRef=useRef()
    useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100);
    }, [messages])
  return (
    <div className='xl:w-11/12 lg:w-9/12 md:w-7/12 sm:w-5/12 p-10 bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30' >
<Header  />
<div className=" overflow-y-auto overflow-x-hidden text-white" style={{height:"17rem"}}>

{messages.length>0 ? messages.map((item)=>(
        <div key={item._id} ref={messageRef}>
          <MessageContainer item={item} />
        </div>
      )):
      <div className='mr-20 mt-32 text-white font-extrabold flex flex-col justify-center items-center' >
      <p>Become first to send a message</p>
          </div>
      }
</div>
<MessageInput />
    </div>
  )
}
