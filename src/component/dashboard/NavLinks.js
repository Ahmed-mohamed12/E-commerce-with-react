import { FaUsers } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";


export const NavLinks=[
    
    {
        name:"users",
        path:"/dashboard/users",
        icon:FaUsers,
        role:["1995","admin"]
    },
    {
        name:"Add User",

        path:"/dashboard/user/add",
        icon:MdAddCircle,
        role:["1995","admin"]
    },
    {
        name:"AddCatygory",
        path:"/dashboard/Category/add",
        icon:FaCartPlus,
        role:["1995","1999","admin"]
    },
    {
        name:"Catygory",
        path:"/dashboard/category",
        icon:FaCartPlus,
        role:["1995","1999","admin"]
    },
    {
        name:"AddProducts",
        path:"/dashboard/product/add",
        icon:FaCartPlus,
        role:["1995","1999","admin"]
    },
    {
        name:"Products",
        path:"/dashboard/Products",
        icon:FaCartPlus,
        role:["1995","1999","admin"]
    },
]