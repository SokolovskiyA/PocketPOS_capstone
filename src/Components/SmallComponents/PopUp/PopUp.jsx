import React from 'react'
import './PopUp.scss'
import Button from '../Button/Button'
import close from '../../../Assets/icons/close.png'

function PopUp({text, closePop}) {

    return (
        <div className='popUp'>
            <p className="popUp__text">{text}</p>
            <Button click={closePop} class='popUp__button' logo={close} text="close"/>
        </div>
    )
}

export default PopUp