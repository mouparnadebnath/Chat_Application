import axios from "axios";
import { useEffect, useState } from "react";

const useGetConversation = () => {
	const [loading, setLoading] = useState(false);
	const [conversation, setConversation] = useState([]);

	useEffect(() => {
		const getConversation = async () => {
			setLoading(true);
			try {
        const jwtToken = localStorage.getItem("token")
		console.log("fetching data")
				const res = await axios.get("https://chat-application-kqbt.onrender.com/api/users", { 
          headers: {
            authorization: `Bearer ${JSON.parse(jwtToken)}`,
            'Content-Type':'application/json' 
          },
        })
				// console.log('fetched data',res.data)
				const fetchedData=res.data
				return fetchedData
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversation().then(
			(fetchedData)=>setConversation(fetchedData),
			console.log("Setting conversation state:", conversation)
		);
	}, []);

	return { loading, conversation };
};
export default useGetConversation;
