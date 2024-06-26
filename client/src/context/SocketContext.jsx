import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
    const authUser=JSON.parse(localStorage.getItem('user'))
console.log(authUser)
	useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-application-kqbt.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });
    
            setSocket(socket);
    
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
    
            return () => {
                if (socket) {
                    socket.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, []);
    




	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
