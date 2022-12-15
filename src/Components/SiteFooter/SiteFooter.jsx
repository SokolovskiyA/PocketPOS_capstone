import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/siteLogo/png/logo-no-background.png';
import './SiteFooter.scss'
import { ReactSession } from 'react-client-session';

function SiteFooter() {
  const userId = ReactSession.get("user_id")

  return (
    <div className="siteFooter">
      <Link className="siteFooter__link" to={`/${userId}`}><img className='siteFooter__logo' src={logo} alt="main-logo"></img></Link>
      <p className='siteFooter__madeBy'>Created by Alexander Sokolovksiy</p>
    </div>  
  )
}

export default SiteFooter