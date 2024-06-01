import { useEffect, useState } from "react"
import useConversation from "../src/components/zustand/useConversation"
import toast from 'react-hot-toast'
const useGetMessages=()=>{
    const [loading, setLoading] = useState(false)
    const {messages,setMessages,selectedConversation}=useConversation()

    useEffect(() => {
    
        const getMessage=async()=>{
            setLoading(true)
            try {
                const token=localStorage.getItem("token")
                console.log(token)
                const res=await fetch(`http://localhost:5000/api/message/${selectedConversation._id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${JSON.parse(token)}`
                    }
                })
                const data=await res.json()
                console.log(data)
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
                console.log(error.message)
            }finally{
                setLoading(false)
            }
    
        }
        if (selectedConversation?._id) getMessage()
    }, [selectedConversation?._id,setMessages])
    return{messages,loading}
}
export default useGetMessages