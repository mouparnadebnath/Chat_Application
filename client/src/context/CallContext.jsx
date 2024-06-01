import { createContext,useContext ,useState} from "react";


export const CallContext=createContext()

export const useCallContext=()=>{
    return useContext(CallContext)
}

export const CallContextProvider=({children})=>{
    const [call, setCall] = useState(false)

    return (<CallContext.Provider value={{call,setCall}}>{children}</CallContext.Provider>)
}