import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './POSworkingScreen.scss'

function POSworkingScreen() {
    const { id } = useParams()
    let {number} = useParams()
    const api = "http://localhost:8081"
    const [products, setProducts] = useState([])
    let [categories, setCategories] = useState([])
    let [drinkCategories, setDrinkCategories] = useState([])
    const [order, setOrder] = useState([])
    
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
        }, [api]);
        const onCategoryClick = (e, category) => {
        e.preventDefault()
        console.log(category.category_id)
        axios
        .get(`${api}/items/${category.category_id}`)
        .then((res) => {
            setProducts(res.data)
        })
        .catch((error) => {
            console.log("error");
        });
    }

    const addToCheck = (e, item) => {
        e.preventDefault()
        setOrder([...order, item])
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
                        <th className='check__header'><p className='subheader'>Table {number}</p></th>
                        <th className='check__header'>seat 1</th>
                        <th className='check__header'>seat 2</th>
                        <th className='check__header'>seat 3</th>
                        <th className='check__header'>seat 4</th>
                        {/*insert loop through seat numbers*/}
                    </tr>
                    {order.map((item)=> (
                        <tr className='check__head'>
                            <td className='check__item'></td>
                            <td className='check__item'>
                                <p className='check__item-text'>{item.name}</p>
                                <p className='check__item-price'>{item.price}</p>
                            </td>
                            <td className='check__item'>
                                <p className='check__item-text'>{item.name}</p>
                                <p className='check__item-price'>{item.price}</p>
                            </td>
                            <td className='check__item'>
                                <p className='check__item-text'>{item.name}</p>
                                <p className='check__item-price'>{item.price}</p>
                            </td>
                            <td className='check__item'>
                                <p className='check__item-text'>{item.name}</p>
                                <p className='check__item-price'>{item.price}</p>
                            </td>
                        </tr>
                    ))}
                    <tr className='check__totals'>
                        <td className='check__table'><p className='subheader'>$ 0</p></td>
                        {/*insert loop through seat numbers*/}
                    </tr>
                </tfoot>
            </table>
    )
}

export default POSworkingScreen