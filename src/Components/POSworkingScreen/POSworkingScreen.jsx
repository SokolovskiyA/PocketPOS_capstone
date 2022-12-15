import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import './POSworkingScreen.scss'

function POSworkingScreen() {
    const { id } = useParams()
    const { tableId } = useParams()
    const api = ReactSession.get("server_api")
    const [products, setProducts] = useState([])
    const [order, setOrder] = useState([])
    const [categories, setCategories] = useState([])
    const [drinkCategories, setDrinkCategories] = useState([])
    const [table, setTable] = useState()
    const [seats, setSeats] = useState([])

    useEffect(() => {
        axios
            .get(`${api}/${id}/menu`)
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
        axios
            .get(`${api}/tables/${tableId}`)
            .then((res)=> {
                setTable(res.data[0])
                console.log(res.data[0].table_seats)
                const seatsRecieved = Array.from({length: res.data[0].table_seats }, (v, i) => i).map((num => {
                    return {seat_number: num,
                        table_id: res.data[0].table_id}
                }))
                setSeats(seatsRecieved)
            })
            .catch((error) => {
                console.log("error");
            });
    }, [api, id]);
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
    const addToCheck = (e, item, activeSeat) => {
        e.preventDefault()
        const newOrder = {
            orderItem_name: item.item_name,
            orderItem_price: item.item_price,
            table_id: tableId
        }
        console.log(newOrder)
    }


    return (
            <table className='main-cabinet'>
                <thead className='slider'>
                    <tr className='slider__row'>
                        {categories.map((cat)=> (
                            <th onClick={e => onCategoryClick(e, cat)} className='slider__item' key={cat.category_id}><p>{cat.category_name}</p></th>
                        ))}
                    </tr>
                    <tr className="slider__row">
                        {drinkCategories.map((cat)=> (
                            <th onClick={e => onCategoryClick(e, cat)} key={cat.category_id} className='slider__item'><p>{cat.category_name}</p></th>
                        ))}
                    </tr>
                </thead>
                <tbody className='dishes'>
                    <tr className='dishes__container'>
                        {products.map((product) => (
                        <td onClick={e => addToCheck(e, product)} className="dishes__dish" id={product.item_id}>
                            <div className='dishes__dish-text'>
                                <p className="">{product.item_name}</p>
                                <p className="">${product.item_price}</p>
                            </div>
                        </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot className="check">
                    <tr className='check__head'>
                        {seats.map((seat)=> (
                            <th className='check__header' key={seat.seat_number}> seat {seat.seat_number}</th>
                        ))}
                    </tr>
                    <tr className='check__totals'>
                        <td className='check__table'><p className='subheader'>$ 0</p></td>
                        {/*insert loop through seat numbers*/}
                    </tr>
                </tfoot>
            </table>
    )
}

export default POSworkingScreen