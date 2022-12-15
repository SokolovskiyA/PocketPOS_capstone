import React from 'react'
import './Button.scss'

function Button(props) {
    return (
        <button type={props.type} onClick={props.click} className={`button ${props.class}`}>
            <img className="button__image" src={props.logo} alt="button"></img>
            <span className="button__text">{props.text}</span>
        </button>
    )
}

export default Button