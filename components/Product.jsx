import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import {AiFillStar,AiOutlineStar,AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import { useEffect, useState } from 'react'


const Product = ({product:{image,name,slug,price,option,available,review,solde,rating}}) => {

const stars = (rt)=>{
  let fill = []
  let outline = []
  let i=1
  for(i; i<=rt; i++){
    fill.push(<AiFillStar/>)
  }

  for(i; i<=5; i++){
    outline.push(<AiOutlineStar/>)
  }

  return [fill,outline]
}
const ns = stars(rating)

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
        <h5 className={`${solde? 'product-promo':'' }`}>
           {solde && solde+'%'}
        </h5>
          <h6 className={`stockava ${available? "available":"outofstock"}`}>
            {
              available?"available":"out of stock"
            }
          </h6>
          <img src={urlFor(image && image[0])}
          width={250}
          height={250}
          className="product-image"
          alt="" />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
          <div className="reviews">
            <div className="">
              {
                rating && ns.map((item)=>(
                  item.map((it,index)=>(
                    <span key={index}>{it}</span>
                  ))
                ))
              }
            </div>
            <p className='rvw'>
            {review && `(${review})`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product