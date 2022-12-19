import { useNavigate } from "react-router-dom";
import Button from '../SmallComponents/Button/Button';
import './MainCabinet.scss'
import add from '../../Assets/images/add.png';
import { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import money from '../../Assets/icons/money-bag.png';
import Avatar from "../SmallComponents/Avatar/Avatar";

function MainCabinet() {
    const userId = ReactSession.get("user_id")
    const api = ReactSession.get("server_api")
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [user, setUser] = useState({})
    const [shift, setShift] = useState([])
    useEffect(() => {
        axios
            .get(`${api}/${userId}`)
            .then((res) => {
                setUser(res.data)
                setRestaurants(res.data.restaurants)
            })
            .catch((error) => {
                console.log("error");
            });
        axios.get(`${api}/${userId}/shift`)
        .then((res)=> {
            setShift(res.data)
        })
    }, [api, userId]);
    const startNewShift = (event, rId) => {
        axios.post(`${api}/${userId}/${rId}/shift`)
                .catch((error) => {
                    console.log("error");
                });
            navigate(`/${userId}/shift`)
    }
    const continueShift = (e) => {
        e.preventDefault()
        navigate(`/${userId}/shift`)
    }
    const addNew = e => {
        navigate('/user/add-new-restaurant')
    }
    return (
        <div className='main-cabinet'>
            <div className="main-cabinet__info">
                    <div className="avo-div">
                        <Avatar />
                    </div>
                <section className="main-cabinet__text">
                    <h1 className="main-cabinet__header">{user.user_name}, here is your statistics:</h1>
                    <p className="main-cabinet__stats">Total shifts worked: {user.user_shifts}</p>
                    <p className="main-cabinet__stats">Total tips this earned: {user.user_tips}</p>
                    <p className="main-cabinet__stats">Total sales: {user.user_sales}</p>
                </section>
            </div>
            {shift.length >0 && <p className ="restaurants__shift-message">to start new shift, please close current one</p>}
            <div className='restaurants'>
                {restaurants.map((restaurant)=> {
                    return (
                    <div  key={restaurant.restaurant_id} className="restaurants__restaurant">
                        <div className='restaurants__header'>
                            <p className='restaurants__text'>{restaurant.restaurant_name}</p>
                            <p className='restaurants__text'>{restaurant.restaurant_address}</p>
                            <p className='restaurants__text'>{restaurant.restaurant_phone}</p>
                        </div>
                        <div className="restaurants__shift-buttons">
                        {shift.length === 0 && <Button class="restaurants__shift" click={e => startNewShift(e, restaurant.restaurant_id)} text="start new shift" logo={money}/>}
                        {shift.length > 0 && <Button class="restaurants__shift" click={e => continueShift(e)} text="Continue shift" logo={money}/>}
                        </div>
                    </div> 
                )})}
                <Button click={addNew} class="restaurants__button" logo={add} text="Add New Restaurant"/>
            </div>
        </div>
    )
}

export default MainCabinet