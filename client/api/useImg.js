import { useState } from "react"

const useImg=()=>{
const [imageUrl,setImageUrl]=useState("")

const handleImageChange=(e)=>{
const file=e.target.files[0]
if (file || file.type.startsWith("image/")) {
    const reader=new FileReader()
    reader.onloadend=()=>{
        setImageUrl(reader.result)
    }
    reader.readAsDataURL(file)
} else {
    setImageUrl("")
}
}
return {handleImageChange,imageUrl,setImageUrl}
}

export default useImg