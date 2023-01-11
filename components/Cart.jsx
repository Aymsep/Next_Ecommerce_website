import React,{useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping, AiOutlineConsoleSql } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast  from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getstripe from '../lib/getstripe'


export const Cart = () => {
  
  const cartref = useRef()
  const {totalprice,totalquantity,cartitems,setShowcart,itemcartqty,onremove} = useStateContext()

  const handleCheckout = async () =>{
    const stripe  = await getstripe()
    const response = await fetch('/api/stripe',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(cartitems)
    })
    
    if(response.statusCode === 500 )return;
    console.log(response)
    const data = await response.json()
    console.log(data)
    toast.loading('redirecting ....')
    stripe.redirectToCheckout({sessionId: data.id})
  }



 


  return (
    <div className='cart-wrapper' ref={cartref}>
      <div className="cart-container">
        <button
        type='button'
        className='cart-heading'
        onClick={()=> setShowcart(false)}
        >
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalquantity})</span>
        </button>
        {cartitems.length < 1 &&(
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>your shopping cart is empty</h3>
            <Link href='/'>
              <button
              type='button'
              onClick={()=> setShowcart(false)}
              className='btn'
              >
                Continue shopping !
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {
            cartitems.length >= 1 && cartitems.map((item,index)=>(
              <div className="product" key={item._id}>
                <img  src={urlFor(item?.image[0])}
                className="cart-product-image"
                alt="" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}$</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                            <span className="minus" onClick={() => itemcartqty(item._id,'dec')}>
                                <AiOutlineMinus/>
                            </span>
                            <span className="num">
                                {item.quantity}
                            </span>
                            <span className="plus" onClick={() => itemcartqty(item._id,'inc')}>
                                <AiOutlinePlus/>
                            </span>
                      </p>
                    </div>
                    <button
                    type='button'
                    className='remove-item'
                    onClick={()=> onremove(item)}
                    >


                      <TiDeleteOutline/>

                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {(cartitems.length >= 1) &&(
          <div className="cart-bottom">
            <div className="total">
              <h3>total price</h3>
              <h3>${totalprice}</h3>
            </div>
            <div className="btn-container">
              <button
              type='button'
              className='btn'
              onClick={handleCheckout}
              >
                pay with stripe
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Cart