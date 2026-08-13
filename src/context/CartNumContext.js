import { createContext, useState,  } from "react"

export const CartNums = createContext(0)
export default function CartNumContext({children}) {
    let len=JSON.parse(localStorage.getItem("product")).length
    const[CartNum,setCartNum] =useState(len||0)
    return <CartNums.Provider value={{CartNum,setCartNum}}>
        
        {children}
        </CartNums.Provider>
    
}
