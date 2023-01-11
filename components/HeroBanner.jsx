import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ herobanner:{
  smalltext, midtext, largertext1, largertext2, image, product, buttontext, desc
} }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smalltext}</p>
        <h3>{midtext}</h3>
        <h1>{largertext1}</h1>
        <img src={urlFor(image[0])} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttontext}</button>
          </Link>
          <div className="desc">
            <h4>Description</h4>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner