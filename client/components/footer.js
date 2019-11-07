import React from 'react'
import {Link} from 'react-router-dom'

import './footer.css'

const Footer = () => {
  return (
    <div id="footer">
      <Link to="/about">About Us </Link>
      <Link to="/contact">Contact Us </Link>
    </div>
  )
}

export default Footer
