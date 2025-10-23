import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currency='$'
    const patientLoginURL='http://localhost:5173/login'
    const calculateAge=(dob)=>{
        const today=new Date()
        const birthDate=new Date(dob)

        let age= today.getFullYear()-birthDate.getFullYear()
        return age
    }
    const value={
        calculateAge,currency,patientLoginURL
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider