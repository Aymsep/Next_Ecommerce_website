import React from 'react'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import {Cart} from './Cart'

const Navbar = () => {
  const {showcart,setShowcart,totalquantity} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Storey</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowcart((prev)=> !prev)}>
        <AiOutlineShoppingCart size={30}/>
        <span className="cart-item-qty">{totalquantity}</span>
      </button>
      {showcart && <Cart/>}
    </div>
  )
}

export default Navbar