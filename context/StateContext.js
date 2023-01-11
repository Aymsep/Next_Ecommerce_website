import React,{createContext, useContext , useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'
import { Product } from '../components'

const Context = createContext()

export const StateContext = ({children})=>{
    const [showcart, setShowcart] = useState(false)
    const [cartitems, setcartitems] = useState([]);
    const [totalprice, setTotalprice] = useState(0)
    const [totalquantity, setTotalquantity] = useState(0)
    const [qty, setqty] = useState(1)
    let i = 0;
    let foundpro;
    let indexpro;



const onremove = (product) => {
    foundpro = cartitems.find((item) => item._id === product._id)
    let newcart = cartitems.filter((item)=> item._id !== product._id)
    setTotalprice((prev)=> prev - foundpro.price * foundpro.quantity)
    setTotalquantity((prev)=> prev - foundpro.quantity)
    setcartitems(newcart)
}




const onadd = (product,quantity)=>{
    const checkitemsincart = cartitems.find((item)=> item._id === product._id)
    if(checkitemsincart){
        const updatecart = cartitems.map((cdproduct)=>{
            return{
                ...cdproduct
            }
        })
            toast.error(`${product.name} already added to cart`)
            setcartitems(updatecart)
        
        
        
        
    }
    else{
        setTotalprice((prev)=> prev + product.price * quantity)
        setTotalquantity((prev)=> prev + quantity)
        cartitems.push(product)
        toast.success(`${qty} ${product.name} added to the list`)
        product.quantity = quantity
        setcartitems([...cartitems],{...product})
    }
}

const itemcartqty = (id,value) => {
    foundpro = cartitems.find((item) => item._id === id)
    indexpro = cartitems.findIndex((product) => product._id === id)
    let newcart = cartitems.filter((item)=> item._id !== id)
    const itemnew = [...newcart]
    if(value==="inc" ){
            foundpro.quantity += 1 
            setTotalprice((prev) => prev + foundpro.price )
            setTotalquantity((prev) => prev + 1 )
        
    }else if(value==="dec"){
        if(foundpro.quantity > 1){
            foundpro.quantity -= 1 
            setTotalprice((prev)=> prev - foundpro.price )
            setTotalquantity((prev) => prev - 1 )
        }
    }
}


    const increase_qty = () => {
        setqty((prev)=>prev + 1)
    }
    const decrease_qty = () => {
        setqty((prev)=> {
            if(prev - 1 < 1)return 1
            return prev - 1
        })
    }
    return(
        <Context.Provider
            value={{                
                qty,
                increase_qty,
                decrease_qty,
                onadd,
                setShowcart,
                showcart,
                totalquantity,
                totalprice,
                cartitems,
                setcartitems,
                setTotalprice,
                setTotalquantity,
                itemcartqty,
                onremove
            }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)