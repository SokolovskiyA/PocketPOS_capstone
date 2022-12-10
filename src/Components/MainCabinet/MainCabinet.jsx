import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../SmallComponents/Button/Button';
import './MainCabinet.scss'
import add from '../../Assets/images/add.png';
import Calendar from 'react-calendar'


function MainCabinet() {

    const restaurants = [{
        restaurant_name: "Lift",
        restaurant_address: "333 Menchions mews",
        restaurant_phone: "+16047151901"
    }]
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
                <Calendar />
            </div>
            <div className='restaurants'>
                {restaurants.map((restaurant)=> {
                    return (
                    <div onClick={chooseRestaurant} id={restaurant.restaurant_name} className="restaurants__restaurant">
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