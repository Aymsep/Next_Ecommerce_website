import React ,{useState,useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext'
import { Fireworks } from '../lib/utils'


const Success = () => {
    const {setcartitems,setTotalprice,setTotalquantity}=useStateContext()
    const [order, setOrder] = useState(null)
    useEffect(()=>{
         localStorage.clear()
         setcartitems([])
         setTotalprice(0)
         setTotalquantity(0)
         Fireworks();
    },[])
  return (
    <div className='succes_wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email for receipt.</p>
            <p className="description">
                if you have any questions , please email 
                <a href="mailto:" className="email">
                    email@lorem.com
                </a>
            </p>
            <Link href='/'>
                <button type="button" className="btn" width="300px">
                    continue shopping
                </button>
            </Link>
        </div>

    </div>
  )
}
export default Success;