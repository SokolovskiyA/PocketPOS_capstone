import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './POSworkingScreen.scss'

function POSworkingScreen() {
    const products = [{
        name: "halibut",
        price: 50
    },
    {
        name: "salmon",
        price: 50
    },
    {
        name: "steak",
        price: 50
    },
    {
        name: "soup",
        price: 50
    },
    {
        name: "burger",
        price: 50
    },
    {
        name: "nachos",
        price: 50
    },
    {
        name: "Branzino",
        price: 50
    },
]
    let {number} = useParams()
    let categories = ["apetizers", "salads", "mains", "desserts", "Sushi", "raw"]
    let drinkCategories = ["coffee", "martinis", "cocktails", "wines", "beers", "pop", "whiskey"]
    
    const [order, setOrder] = useState([])
    const addToCheck = (e, item) => {
        e.preventDefault()
        setOrder([...order, item])
    }
    return (
            <table className='main-cabinet'>
                <thead className='slider'>
                    <tr className='slider__row'>
                        {categories.map((category)=> (
                            <th className='slider__item' key={category}><p>{category}</p></th>
                        ))}
                    </tr>
                    <tr className="slider__row">
                        {drinkCategories.map((cat)=> (
                            <th className='slider__item'><p>{cat}</p></th>
                        ))}
                    </tr>
                </thead>
                <tbody className='dishes'>

                    <tr className='dishes__container'>
                        {products.map((product) => (
                        <td onClick={e => addToCheck(e, product)} className="dishes__dish" id={product.name}>
                            <div className='dishes__dish-text'>
                                <p className="">{product.name}</p>
                                <p className="">${product.price}</p>
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