import React from 'react';
import './Avatar.scss'
import avatar from '../../../Assets/images/waiter.png'


function Avatar(props) {
    return (
        <div className={`avatar ${props.class}`}>
            <img className="avatar__img" src={avatar} alt="avo"/> 
        </div>
    )
}
export default Avatar