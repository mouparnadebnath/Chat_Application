import axios from "axios"
const url='https://chat-application-kqbt.onrender.com/api/auth'
export const userLogout=async(data)=>{
try {
    const response=await axios.post(`${url}/logout`,data)
    localStorage.removeItem("user")
    return response
} catch (error) {
    console.log("error while logging out",error.message)

}
}
