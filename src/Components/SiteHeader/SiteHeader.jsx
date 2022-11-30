import React from 'react'
import './SiteHeader.scss'
import { Link } from "react-router-dom";
import Button from '../SmallComponents/Button/Button';
import Avatar from '../SmallComponents/Avatar/Avatar';
import logo from '../../Assets/siteLogo/png/logo-no-background.png';
import logout from '../../Assets/siteLogo/logout.png'

function SiteHeader() {
    return (
        <nav className="siteHeader">
            <Link className="siteHeader__link" to="/cabinet"><img className='siteHeader__logo' src={logo} alt="main-logo"></img></Link>
            <Avatar class="siteHeader__avatar" />
            <p className="siteHeader__greeting">Welcome User1!</p>
            <Button className="siteHeader__button" text="log out" logo={logout}/>
        </nav>
    )
}

export default SiteHeader