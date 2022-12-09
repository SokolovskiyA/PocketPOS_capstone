import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './POSworkingScreen.scss'

function POSworkingScreen() {
    let {number} = useParams()

    let categories = ["apetizers", "salads", "mains", "desserts", "Sushi", "raw", "category", "category", "category", "category", "category", "category", "category", "category", "category", "category", ]
    let drinkCategories = ["coffee", "martinis", "cocktails", "wines", "beers", "pop", "whiskey"]
    const [order, setOrder] = useState([])
    
    const addToCheck = e => {
        e.preventDefault()
        console.log(e.pr)
    
    }
    const products = [{
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
    {
        name: "halibut",
        price: 50
    },
]


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
                        <td onClick={addToCheck} className="dishes__dish">
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
                        <td className='check__table'><p className='subheader'>Table {number}</p></td>
                        {/*insert loop through seat numbers*/}
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