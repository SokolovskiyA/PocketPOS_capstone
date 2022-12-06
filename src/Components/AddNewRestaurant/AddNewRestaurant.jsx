import React from 'react'
import './AddNewRestaurant.scss'
import { useState} from "react";
import chevron from '../../Assets/icons/chevron.svg'
import Button from '../../Components/SmallComponents/Button/Button'
import error from '../../Assets/icons/close.png'
import success from '../../Assets/icons/check.png'
import { useNavigate } from "react-router-dom";


function AddNewRestaurant() {
    const navigate = useNavigate()
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantAddress, setRestaurantAddress] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [categories, setCategories] = useState([{category: ""}])
    const [drinkCat, setDrinkCat] = useState([{drink_category: ""}])
    
    
    const [items, setItems] = useState([])
    

    const handleFoodCategoryAdd = () => {
        setCategories([...categories, {category: ""}])
    }
    const handleDrinkCategoryAdd = () => {
        setDrinkCat([...drinkCat, {drink_category: ""}])
    }
    const handleCategoryRemove = (index, array, func) => {
        const list = [...array]
        list.splice(index, 1)
        func(list)
        console.log(array)
    }
    const handleCategoryChange = (e , i, array, func) => {
        const {name, value} = e.target
        const list = [...array]
        list[i][name] = value;
        func(list)
    }



    const handleCancel = e => {
        e.preventDefault()
        navigate('/')
    }
    const handleSubmit = e => {
        e.preventDefault()
        let newRestaurant = {
            restaurant_name: restaurantName,
            restaurantAddress: restaurantAddress,
            restaurantPhone: restaurantPhone
        }
        let drinkCategories = drinkCat
        let foodCategories = categories 
        console.log(foodCategories)
        console.log(drinkCategories)
        console.log(newRestaurant)
    }
    return (
        <div className='main-cabinet'>
            <h1 className="header">Congrats with the new job!</h1>
            <h3 className="subheader">Let`s get you started:</h3>
            <form onSubmit={handleSubmit} className='addNew'>
                <div className='addNew__inputs-div'>
                    <label className="addNew__label">Add New Restaurant<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    <input className='addNew__input' value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)} type="text" placeholder="Restaurant Name"/>
                    <input className='addNew__input' value={restaurantAddress} onChange={(e)=>setRestaurantAddress(e.target.value)} type="text" placeholder="Restaurant Address"/>
                    <input className='addNew__input' value={restaurantPhone} onChange={(e)=>setRestaurantPhone(e.target.value)} type="text" placeholder="Restaurant Phone"/>
                </div>
                <div className='addNew__inputs-div'>
                <label className="addNew__label">add menu categories<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    {categories.map((category, i) => {
                        return (
                        <div key={i} className='addNew__category'>
                            <input name="category" value={category.category} onChange={(e)=> handleCategoryChange(e, i, categories, setCategories)} className='addNew__category-input' type="text" placeholder='Menu Category'/>
                            <div className="addNew__buttons">
                                {categories.length !== 1 && <button onClick={()=> handleCategoryRemove(i, categories, setCategories)} className='addNew__remove'></button>}
                                {categories.length - 1 === i && <button onClick={handleFoodCategoryAdd} className='addNew__add'></button>}
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className='addNew__inputs-div'>
                <label className="addNew__label">add drinks categories<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    {drinkCat.map((category, i) => {
                        return (
                        <div key={i} className='addNew__category'>
                            <input name="drink_category" value={category.drink_category} onChange={(e)=> handleCategoryChange(e, i, drinkCat, setDrinkCat)} className='addNew__category-input' type="text" placeholder='Drink Category'/>
                            <div className="addNew__buttons">
                                {drinkCat.length !== 1 && <button onClick={()=> handleCategoryRemove(i, drinkCat, setDrinkCat)} className='addNew__remove'></button>}
                                {drinkCat.length - 1 === i && <button onClick={handleDrinkCategoryAdd} className='addNew__add'></button>}
                            </div>
                        </div>
                    )
                    })}
                </div>
                <div className='addNew__inputs-div'>
                <label className="addNew__label">add new item<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    {/*drinkCat.map((category, i) => {
                        return (
                        <div className='addNew__item'>
                            <input name="item_name" className='addNew__category-input' type="text" placeholder="Item Name"/> 
                            <input name="item_price" className='addNew__category-input' type="number" placeholder="Item Price"/> 
                            <input name="item_category" className='addNew__category-input' type="" placeholder="Item Category"/>
                            <input name="item_description" className='addNew__category-input' type="" placeholder="Item Description"/>
                            <div className="addNew__buttons">
                                {drinkCat.length !== 1 && <button className='addNew__remove'></button>}
                                {drinkCat.length - 1 === i && <button onClick={handleAddCatClick} className='addNew__add'></button>}
                            </div>
                        </div>
                        )
                    })*/}
                </div>
                <div className='addNew__buttons'>
                    <Button click={handleCancel} logo={error} text="cancel"></Button>
                    <Button type="submit" logo={success} text="submit"></Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewRestaurant