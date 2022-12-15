import React from 'react'
import './SiteHeader.scss'
import { Link } from "react-router-dom";
import Button from '../SmallComponents/Button/Button';
import Avatar from '../SmallComponents/Avatar/Avatar';
import logo from '../../Assets/siteLogo/png/logo-no-background.png';
import logout from '../../Assets/siteLogo/logout.png'
import { ReactSession } from 'react-client-session';

function SiteHeader() {
    const userId = ReactSession.get("user_id")
    return (
        <nav className="siteHeader">
            <Link className="siteHeader__link" to={`/${userId}`}><img className='siteHeader__logo' src={logo} alt="main-logo"></img></Link>
            {/*<div className="siteHeader__user-div">
                <p className="siteHeader__greeting">Welcome User1!</p>
                <Avatar className="siteHeader__avatar" />
                <Button className="siteHeader__button" text="" logo={logout}/>
            </div>*/}
        </nav>
    )
}

export default SiteHeader