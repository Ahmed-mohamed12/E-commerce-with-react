import { createContext, useState } from "react"

export const CartNums = createContext(0)

export default function CartNumContext({ children }) {
  // ✅ الحل الآمن
  let data = localStorage.getItem("product");
  let len = data ? JSON.parse(data).length : 0;
  
  const [CartNum, setCartNum] = useState(len);
  
  return (
    <CartNums.Provider value={{ CartNum, setCartNum }}>
      {children}
    </CartNums.Provider>
  );
}