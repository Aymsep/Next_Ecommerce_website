import React, {useState} from 'react'
import {client,urlFor} from '../../lib/client'
import {AiFillStar,AiOutlineStar,AiOutlineMinus,AiOutlinePlus,AiFillGift} from 'react-icons/ai'
import {MdLocalShipping} from 'react-icons/md'
import { Product } from '../../components'
import {useStateContext} from '../../context/StateContext'

const ProductDetails = ({product,products}) => {
  const {name,image,price,details,option,rating,review} = product
  const {decrease_qty,increase_qty,qty,onadd,setShowcart} = useStateContext()
  const handlebuynow = () =>{
    onadd(product,qty)
    setShowcart(true)
  }




  
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
  
  const [index,setindex] = useState(0)
  return (
    <div>
      <div className="product-detail-container">
        <div className="">
          <div className="image-container">
            <img src={urlFor(image && image[index])} alt=""  className="product-detail-image"/>
          </div>
          <div className="small-images-container">
            {
              image?.map((item,i) =>(
                <img key={i} src={urlFor(item)}
                className={i === index ? "small-image selected-image":"small-image"}
                onMouseEnter={() => setindex(i)}
                />
              ))
            }
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
            <p className="price">${price}</p>

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

            <p className="shipping">
              <MdLocalShipping size={20}/>
              Shipping calculated at checkout. 
              </p>
            <p className="offer">
              <AiFillGift size={20}/>
              Buy 1 Get 1 Free & Free Shipping Worldwide
              <AiFillGift size={20}/>

              </p>
           
              <h4 className="thebest">the best : </h4>

              <ul className="product-option">
              {
                   option?.map((opt,id)=> (
                    <li key={id}>{opt}.</li>
                   ))
                  }
                  </ul>

            <div className="quantity">
              <h3>Quantity : </h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decrease_qty}>
                    <AiOutlineMinus/>
                </span>
                <span className="num">
                    {qty}
                </span>
                <span className="plus" onClick={increase_qty}>
                    <AiOutlinePlus/>
                </span>
              </p>
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart" onClick={()=> onadd(product,qty)}>add to cart</button>
              <button type="button" className="buy-now" onClick={handlebuynow}>buy now</button>
            </div>
        </div>
      </div>

      <div className="details">
            <h2>details : </h2>
            <p>{details}</p>
      </div>


      <div className="maylike-products-wrapper">
        <h2>may also like</h2>
        <div className="marquee"> 
          <div className="maylike-products-container track">
            {
              products.map((item) =>(
                <Product key={item._id} product={item}/>
              ))
            }
         
          </div>
        </div>
      </div>
    </div>
  )
}
export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{
    slug{
      current
    }
  }`
  const products = await client.fetch(query)
  const paths = products.map((product) => ({
    params: {
      slug:product.slug.current
    }
  }))
  return{
    paths,
    fallback:'blocking'
  }
}



export const getStaticProps = async ({params:{slug}}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product_query = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(product_query)

  return{
    props:{products,product}
  }
}
export default ProductDetails