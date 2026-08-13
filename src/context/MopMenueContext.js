import { createContext, useState } from "react"

export const MobMenue = createContext(" ")
export default function MopMenueContext({children}) {
    const[isOpen,setIsOpen] =useState(false)
    return <MobMenue.Provider value={{isOpen,setIsOpen}}>
        
        {children}
        </MobMenue.Provider>
    
}

