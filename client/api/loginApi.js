import axios from "axios"
const URL="http://localhost:5000/api/auth"
export const authenticateLoginUser=async(data)=>{
try {
   const res=await axios.post(`${URL}/login`,data,{
        headers:{
            "Content-Type": "application/json"
        }
    })
console.log(res)
    localStorage.setItem("token",JSON.stringify(res.data.token))
    localStorage.setItem("user",JSON.stringify(res.data))
    return res
} catch (error) {
    console.log('error while login',error.message)
}

}