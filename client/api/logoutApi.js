import axios from "axios"
const url='http://localhost:5000/api/auth'
export const userLogout=async(data)=>{
try {
    const response=await axios.post(`${url}/logout`,data)
    localStorage.removeItem("user")
    return response
} catch (error) {
    console.log("error while logging out",error.message)

}
}