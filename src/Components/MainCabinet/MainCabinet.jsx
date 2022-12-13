import React, { useReducer } from 'react'
import { useFetcher, useNavigate } from "react-router-dom";
import Button from '../SmallComponents/Button/Button';
import './MainCabinet.scss'
import add from '../../Assets/images/add.png';
import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import axios from 'axios';


function MainCabinet() {
    const id = "1";
    const navigate = useNavigate();
    const api = "http://localhost:8081"
    const [restaurants, setRestaurants] = useState([]);
    const [user, setUser] = useState({})
    useEffect(() => {
        axios
            .get(`${api}/${id}`)
            .then((res) => {
                setUser(res.data)
                setRestaurants(res.data.restaurants)
            })
            .catch((error) => {
                console.log("error");
            });
        }, [api]);

    const chooseRestaurant = event => {
        navigate(`/user/${event.target.id}`)
    }
    const addNew = e => {
        navigate('/user/add-new-restaurant')
    }
    return (
        <div className='main-cabinet'>
            <div className="main-cabinet__info">
                {/*<div className='main-cabinet__avatar-div'>
                    <Avatar class="main-cabinet__avatar"/>
                    <Button class="main-cabinet__uploadButton" logo={uploadAvo} text="choose new avatar"/>
                </div>*/} 
                <section className="main-cabinet__text">
                    <h1>{user.user_name}, here is your statistics:</h1>
                    <p>Total shifts worked: {user.user_shifts}</p>
                    <p>Total tips this earned: {user.user_tips}</p>
                    <p>Total sales: {user.user_sales}</p>
                </section>
                <Calendar />
            </div>
            <div className='restaurants'>
                {restaurants.map((restaurant)=> {
                    return (
                    <div onClick={chooseRestaurant} key={restaurant.restaurant_id} id={restaurant.restaurant_id} className="restaurants__restaurant">
                        <div className='restaurants__header'>
                            <p className='restaurants__text'>{restaurant.restaurant_name}</p>
                            <p className='restaurants__text'>{restaurant.restaurant_address}</p>
                            <p className='restaurants__text'>{restaurant.restaurant_phone}</p>
                        </div>
                    </div> 
                )})}
                
                <Button click={addNew} class="restaurants__button" logo={add} text="Add New Restaurant"/>
            </div>
        </div>
    )
}

export default MainCabinet