import React from 'react';
import './Avatar.scss'
import avatar from '../../../Assets/images/waiter.png'


function Avatar(props) {
    return (
        <img className="avatar" src={avatar} alt="avo"/> 
    )
}
export default Avatar