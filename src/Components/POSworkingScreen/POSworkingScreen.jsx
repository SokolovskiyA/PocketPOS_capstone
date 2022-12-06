import React, { useState } from 'react'
import './POSworkingScreen.scss'

function POSworkingScreen() {
    let categories = ["apetizers", "salads", "mains", "desserts", "Sushi", "raw"]
    let drinksCategories = ["coffee", "martinis", "cocktails", "wines", "beers", "pop"]
    const [order, setOrder] = useState([])
    
    const addToCheck = e => {
        e.preventDefault()
        let checkEntry = {
            name: e.target.name,
            price: e.target.price
        }
        console.log(checkEntry)
        order.push(checkEntry)
        setOrder([...order, checkEntry])
    }
    
    const menuItems = [{
        name: "pizza",
        price: "20",
        category: "mains"
    },
    {
        name: "pizza",
        price: "20",
        category: "mains"
    },
    {
        name: "pizza",
        price: "20",
        category: "mains"
    },
    {
        name: "pizza",
        price: "20",
        category: "mains"
    },
    {
        name: "caesar",
        price: "20",
        category: "salads"
    },
    {
        name: "caprese",
        price: "20",
        category: "salads"
    },
    {
        name: "arugula",
        price: "20",
        category: "salads"
    },
    {
        name: "medetirnian",
        price: "20",
        category: "salads"
    },
    {
        name: "medetirnian",
        price: "20",
        category: "drinks"
    },
    {
        name: "medetirnian",
        price: "20",
        category: "drinks"
    },
    {
        name: "medetirnian",
        price: "20",
        category: "drinks"
    },
    {
        name: "medetirnian",
        price: "20",
        category: "drinks"
    },
]


    return (
        <div className='main-cabinet'>
            <div className='categories'>
                {categories.map((category)=> (
                    <p className='categories__category'>{category}</p>
                ))}
            </div>
            <div className='categories'>
                {drinksCategories.map((category)=> {
                    return (
                        <p className='categories__category'>{category}</p>
                    )
                })}
            </div>
            <div className='products'>
                {menuItems.map((item)=>{
                    return (
                    <div onClick={addToCheck} className="products__product" name={item.name} price={item.price}>
                        <p className="products__name">{item.name}</p>
                        <p className="products__price">{`$ ${item.price}`}</p>
                    </div>
                    )
                    
                })}
            </div>
            <div className="check">
                <h2>Table 1</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Item</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item)=> {
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default POSworkingScreen