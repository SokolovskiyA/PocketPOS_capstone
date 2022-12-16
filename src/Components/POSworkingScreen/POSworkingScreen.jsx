import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import './POSworkingScreen.scss'
import del from '../../Assets/icons/close.png'
import Button from '../SmallComponents/Button/Button';

function POSworkingScreen() {
    //const { id } = useParams()
    const { tableId } = useParams()
    const api = ReactSession.get("server_api")
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [drinkCategories, setDrinkCategories] = useState([])
    const [seats, setSeats] = useState([])
    const [table, setTable] = useState({})
    const [order, setOrder] = useState([])
    const [activeSeat, setActiveSeat ] = useState(0)
    const [orderTotal, setTotal ] = useState()
    const getOrder = () =>{
        axios
        .get(`${api}/table/${tableId}/order`)
        .then((res)=> {
            setOrder(res.data)
            const total = res.data.reduce((accumulator, currentValue) => accumulator + currentValue.orderItem_price, 0,)
            setTotal(total)
        })
    }
    const addToCheck = useCallback((e, item) => {
        e.preventDefault()
        const newOrder = {
            orderItem_name: item.item_name,
            orderItem_price: item.item_price,
            table_id: tableId,
            orderItem_seat: activeSeat
        }
        axios
            .post(`${api}/table/${tableId}/order`, newOrder)
            .then((res)=> {
                getOrder()
            })
            .catch((error) => {
                console.log("error");
            });
        
    },[activeSeat, api, tableId])

    useEffect(() => {
        getOrder()
        axios
            .get(`${api}/tables/${tableId}`)
            .then((res)=> {
                setTable(res.data[0])
                const rId = res.data[0].restaurant_id
                axios
                    .get(`${api}/${rId}/menu`)
                    .then((res) => {
                        const allCategories = res.data;
                        const dCat = allCategories.filter(category => category.category_type === "drink")
                        const fCat = allCategories.filter(category => category.category_type === "food")
                        setDrinkCategories(dCat)
                        setCategories(fCat)
                    })
                    .catch((error) => {
                        console.log("error");
                    });
                const seatsRecieved = Array.from({length: res.data[0].table_seats }, (v, i) => i).map((num => {
                    return {seat_number: num,
                        table_id: res.data[0].table_id}
                }))
                setSeats(seatsRecieved)
            })
            .catch((error) => {
                console.log("error");
            });
    }, [api, tableId]);

    const onCategoryClick = (e, category) => {
        e.preventDefault()
        axios
        .get(`${api}/items/${category.category_id}`)
        .then((res) => {
            setProducts(res.data)
        })
        .catch((error) => {
            console.log("error");
        });
    }
    const onSeatClick = (event, seat) => {
        setActiveSeat(seat.seat_number)
        event.currentTarget.classList.toggle('active-seat');
    };
    const deleteItem = (event, item) => {
        axios
            .delete(`${api}/order/${item.orderItem_id}`)
            .then((res)=> {
                getOrder()
            })
            .catch((error) => {
                console.log("error");
            });
    }
    return (
            <div className='main-cabinet'>
                <div className='slider'>
                    <ul className='slider__row'>
                        {categories.map((cat)=> (
                            <li onClick={e => onCategoryClick(e, cat)} className='slider__item' key={cat.category_id}><p>{cat.category_name}</p></li>
                        ))}
                    </ul>
                    <ul className="slider__row">
                        {drinkCategories.map((cat)=> (
                            <li onClick={e => onCategoryClick(e, cat)} key={cat.category_id} className='slider__item'><p>{cat.category_name}</p></li>
                        ))}
                    </ul>
                </div>
                <div className='dishes'>
                    <ul className='dishes__container'>
                        {products.map((product) => (
                        <li onClick={e => addToCheck(e, product)} className="dishes__dish" id={product.item_id}>
                            <div className='dishes__dish-text'>
                                <p className="">{product.item_name}</p>
                                <p className="">${product.item_price}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="check">
                    <ul className='check__head'>
                        {seats.map((seat)=> (
                            <li onClick={e => onSeatClick(e, seat)} className='check__header' key={seat.seat_number}> seat {seat.seat_number}</li>
                        ))}
                    </ul>
                    <ul className='check__items'>
                        {seats.map((seat)=> (
                            <li className='check__items-box' key={seat.seat_number}>
                                <h4>seat {seat.seat_number}</h4>
                                {order.filter(item => item.orderItem_seat === seat.seat_number).map((item)=>
                                    <div key={item.orderItem_id} className='check__item'>
                                        <p className="check__item-text">{item.orderItem_name}</p>
                                        <img onClick={e => deleteItem(e, item)} className='check__delete-button' src={del} alt="delete"/>
                                        <p className="check__item-text">{item.orderItem_price}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className='check__totals'>
                        <p className='subheader'>Table {table.table_number}</p>
                        <p className='subheader'>$ {orderTotal}</p>
                        <label className="check__label">Tip amount $</label>
                        <input className="check__input" name="table_tips" type="number" placeholder="1.0" step="0.01" min="0" max="10000" />
                        <Button class="check__close" logo={del} text="close table"/>
                    </div>
                </div> 
            </div>         
    )
}

export default POSworkingScreen