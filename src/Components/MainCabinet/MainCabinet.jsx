import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from '../SmallComponents/Avatar/Avatar';
import Button from '../SmallComponents/Button/Button';
import uploadAvo from '../../Assets/images/user.png';
import './MainCabinet.scss'
import add from '../../Assets/images/add.png';

function MainCabinet() {
    return (
        <div className='main-cabinet'>
            <div className="main-cabinet__info">
                <div className='main-cabinet__avatar-div'>
                    <Avatar class="main-cabinet__avatar"/>
                    <Button class="main-cabinet__uploadButton" logo={uploadAvo} text="choose new avatar"/>
                </div> 
                <section className="main-cabinet__text">
                    <h1>Your statistics</h1>
                    <p>Total shifts this month: </p>
                    <p>Total tips this month: </p>
                    <p>Total sales this month: </p>
                </section>
            </div>
            <div className='restaurants'>
                <div className="restaurants__restaurant">
                    <h2 className='restaurants__name'>restaurant1</h2>
                    <img/>
                </div> 
                <div className="restaurants__restaurant">
                    <h2 className='restaurants__name'>restaurant1</h2>
                    <img/>
                </div> 
                <div className="restaurants__restaurant">
                    <h2 className='restaurants__name'>restaurant1</h2>
                    <img/>
                </div> 
                <div className="restaurants__restaurant">
                    <h2 className='restaurants__name'>restaurant1</h2>
                    <img/>
                </div> 
                <Button logo={add} text="Add New Restaurant"/> 
            </div>
        </div>
    )
}

export default MainCabinet