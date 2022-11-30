import React from 'react'
import './Button.scss'

function Button(props) {
    return (
        <button onClick={props.click} className={`button ${props.class}`}>
            <img className="button__image" src={props.logo} alt="button-image"></img>
            <span className="button__text">{props.text}</span>
        </button>
    )
}

export default Button