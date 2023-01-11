import React from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
const  Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 &copy; Store all rights reserved </p>
      <p className="icons">
      <AiFillInstagram/>
      <AiFillTwitterCircle/>
      <AiFillFacebook/>
      </p>
    </div>
  )
}

export default Footer