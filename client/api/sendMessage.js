import axios from "axios";
import { useState } from "react";
import useConversation from "../src/components/zustand/useConversation";
import useImg from "./useImg";
const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const { imageUrl } = useImg();
  const sendMessage = async (message,image) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify({message}),
        }
      );
      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};
export default useSendMessage;
