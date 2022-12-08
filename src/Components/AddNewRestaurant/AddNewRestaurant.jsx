import React from 'react'
import './AddNewRestaurant.scss'
import { useState} from "react";
import chevron from '../../Assets/icons/chevron.svg'
import Button from '../../Components/SmallComponents/Button/Button'
import error from '../../Assets/icons/close.png'
import success from '../../Assets/icons/check.png'
import { useNavigate } from "react-router-dom";


function AddNewRestaurant() {
    const allergies = [ "dairy", "gluten",  "shellfish", "fish", "tree nuts", "peanuts", "soy", "eggs" ]
    const navigate = useNavigate()
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantAddress, setRestaurantAddress] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [categories, setCategories] = useState([{category: ""}])
    const [drinkCat, setDrinkCat] = useState([{drink_category: ""}])
    const [itemType, setItemType ] = useState("Food Item")
    const [items, setItems] = useState([{}])


    ////form field manipulation////
    const handleFoodCategoryAdd = () => {
        setCategories([...categories, {category: ""}])
    }
    const handleDrinkCategoryAdd = () => {
        setDrinkCat([...drinkCat, {drink_category: ""}])
    }
    const handleItemAdd = () => {
        setItems([...items, {
            item_name:"",
            item_description:"",
            item_price: Number(),
            item_category:"",
            item_alergies:[],
        }])
    }
    const handleRemove = (index, array, func) => {
        const list = [...array]
        list.splice(index, 1)
        func(list)
    }
    const handleChange = (e , i, array, func) => {
        const {name, value} = e.target
        const list = [...array]
        list[i][name] = value;
        func(list)
    }


    ///Submit handlers/////
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
                            <input name="category" value={category.category} onChange={(e)=> handleChange(e, i, categories, setCategories)} className='addNew__category-input' type="text" placeholder='Menu Category'/>
                            <div className="addNew__buttons">
                                {categories.length !== 1 && <button onClick={()=> handleRemove(i, categories, setCategories)} className='addNew__remove'></button>}
                                {categories.length - 1 === i && <button onClick={handleFoodCategoryAdd} className='addNew__add'></button>}
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className='addNew__inputs-div'>
                <label className="addNew__label">add drink categories<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    {drinkCat.map((category, i) => {
                        return (
                        <div key={i} className='addNew__category'>
                            <input name="drink_category" value={category.drink_category} onChange={(e)=> handleChange(e, i, drinkCat, setDrinkCat)} className='addNew__category-input' type="text" placeholder='Drink Category'/>
                            <div className="addNew__buttons">
                                {drinkCat.length !== 1 && <button onClick={()=> handleRemove(i, drinkCat, setDrinkCat)} className='addNew__remove'></button>}
                                {drinkCat.length - 1 === i && <button onClick={handleDrinkCategoryAdd} className='addNew__add'></button>}
                            </div>
                        </div>
                    )
                    })}
                </div>
                <div className='addNew__inputs-div'>
                <label className="addNew__label">add new item<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                    {items.map((item, i)=> {
                        return (
                            <div key={i} className='item'>
                                <input name="item_name" value={item.item_name} onChange={(e)=> handleChange(e, i, items, setItems)} type="text" className='item__input'  placeholder='Item Name'/>
                                <input name="item_price" value={item.item_price} onChange={(e)=> handleChange(e, i, items, setItems)} type="number" className='item__input' placeholder='Item Price $'/>
                                <textarea name="item_description" value={item.item_description} onChange={(e)=> handleChange(e, i, items, setItems)} type="text" className="item__input" placeholder='Item Decription (syllabus, ingredients, etc.)' rows="5"/>
                                    <div className='item__type'>    
                                        <div className="item__radio">
                                            <input type="radio" name="item type" value="Food Item" onClick={(e) => setItemType("Food Item")} defaultChecked/>
                                            <label labelfor="item type">Food Item</label>
                                        </div>
                                        <div className="item__radio">
                                            <input type="radio" name="item type" value="Drink Item" onClick={(e) => setItemType("Drink Item")}/>
                                            <label labelfor="item type">Drink Item</label>
                                        </div>
                                    </div>
                                <select name="item_category" className="item__input" onChange={(e)=> handleChange(e, i, items, setItems)}>
                                    { itemType === "Food Item" && (
                                        categories.map((category)=> {
                                        return(
                                            <option key={category.category}>{category.category}</option>
                                    )}))}
                                    { itemType === "Drink Item" && (
                                        drinkCat.map((category)=> {
                                        return(
                                            <option key={category.drink_category} placeholder="please select item category">{category.drink_category}</option>
                                    )}))}
                                </select>
                                <div className="item__allergies" name="allergies">
                                    <label className="addNew__label item__allergies-label">Choose allergy allerts<img className='addNew__label-img' src={chevron} alt="chevron"/></label>
                                    {allergies.map((allergy) => (
                                        <div key={allergy} className='item__allergy'>
                                            <input type="checkbox" name={allergy} value={allergy}/>
                                            <label labelfor={allergy}>{allergy}</label>
                                        </div>
                                    ))}
                                    
                                </div>
                                <div className="addNew__buttons">
                                    {items.length !== 1 && <button onClick={()=> handleRemove(i, items, setItems)} className='addNew__remove'></button>}
                                    {items.length - 1 === i && <button onClick={handleItemAdd} className='addNew__add'></button>}
                                </div>
                            </div>
                        )
                    })}
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