import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/siteLogo/png/logo-no-background.png';
import './SiteFooter.scss'

function SiteFooter() {
  return (
    <div className="siteFooter">
      <Link className="siteFooter__link" to="/user"><img className='siteFooter__logo' src={logo} alt="main-logo"></img></Link>
      <p className='siteFooter__madeBy'>Created by Alexander Sokolovksiy</p>
    </div>  
  )
}

export default SiteFooter