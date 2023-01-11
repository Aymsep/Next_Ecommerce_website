import React , { useEffect, useState } from 'react'
import {Product,FooterBanner,HeroBanner,Tag} from '../components/index'
import Tags from '../components/Tag'
import {client} from '../lib/client'

const Home = ({products,bannerdata}) => {
  const [val,setval] = useState('all')

 function getvalue(e){
   setval(e.currentTarget.value)
}


return (
    <>
    
    <HeroBanner herobanner={bannerdata[1]}  />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variation</p>
    </div>

    <div className="tags-container">
    
      <button type="button" data-tag="all"  onClick={getvalue}       value="all"  className="">all</button>
      <button type="button" data-tag="bass"  onClick={getvalue}      value="bass" className="">bass</button>
      <button type="button" data-tag="watch"  onClick={getvalue}     value="watch"  className="">watch</button>
      <button type="button" data-tag="airpods"  onClick={getvalue}   value="airpods"  className="">airpods</button>
      <button type="button" data-tag="earphone"  onClick={getvalue}  value="earphone"  className="">earphone</button>
      <button type="button" data-tag="headphone"  onClick={getvalue} value="headphone"  className="">headphone</button>

    </div>
    <div className="products-container">

        {
          products.map((product,index) =>(
            (product.tag == val || val == 'all' ) && <Product key={index} product={product} />
          ))
      }
      
      
    </div>
    
    <FooterBanner footerbanner={bannerdata && bannerdata[0]}/>

    </>
  )
}
export const getServerSideProps = async () => {

  const query = `*[_type == "product"]`
  const products = await client.fetch(query)
  const banner_query = '*[_type == "banner"]'
  const bannerdata = await client.fetch(banner_query)
  return{
    props:{products,bannerdata}
  }
}

export default Home