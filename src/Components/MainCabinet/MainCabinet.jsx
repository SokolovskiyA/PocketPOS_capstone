import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '../SmallComponents/Avatar/Avatar';
import Button from '../SmallComponents/Button/Button';
import uploadAvo from '../../Assets/images/user.png';
import './MainCabinet.scss'
import add from '../../Assets/images/add.png';
import rePic from '../../Assets/images/restaurantDummie.jpeg'

function MainCabinet() {
    const navigate = useNavigate();
    const chooseRestaurant = event => {
        navigate(`/${event.target.id}`)
    }
    const addNew = e => {
        navigate('/add-new-restaurant')
    }
    return (
        <div className='main-cabinet'>
            <div className="main-cabinet__info">
                {/*<div className='main-cabinet__avatar-div'>
                    <Avatar class="main-cabinet__avatar"/>
                    <Button class="main-cabinet__uploadButton" logo={uploadAvo} text="choose new avatar"/>
                </div>*/} 
                <section className="main-cabinet__text">
                    <h1>Your statistics</h1>
                    <p>Total shifts this month: </p>
                    <p>Total tips this month: </p>
                    <p>Total sales this month: </p>
                </section>
            </div>
            <div className='restaurants'>
                <div onClick={chooseRestaurant} id="01" className="restaurants__restaurant">
                    <h2 className='restaurants__name'>restaurant1</h2>
                </div> 
                <Button click={addNew} class="restaurants__button" logo={add} text="Add New Restaurant"/>
            </div>
        </div>
    )
}

export default MainCabinet