import { useEffect } from "react"; 
import { useSocketContext } from "../src/context/SocketContext";
import useConversation from "../src/components/zustand/useConversation";
import notificationSound from "../src/assets/notificationSound.mp3"
import Sound from "../src/assets/Sound.mp3"
const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(Sound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
