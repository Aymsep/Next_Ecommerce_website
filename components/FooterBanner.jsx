import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const FooterBanner = ({footerbanner:{discount, product, largertext1, largertext2 ,saletime, smalltext, midtext, desc, buttontext, image} }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        
        <div className="left">
          <p>{discount}% OFF</p>
          <h3>{largertext2}</h3>
          <h3>{largertext1}</h3>
          <p>{saletime}</p>
        </div>
        <img src={urlFor(image[0])} className="footer-banner-image" alt="" />

        <div className="right">
          <p>{smalltext}</p>
          <h3>{midtext}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttontext}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner