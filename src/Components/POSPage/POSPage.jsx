import React from 'react'
import Button from '../SmallComponents/Button/Button'
import './POSPage.scss'
import tableLogo from '../../Assets/images/dining-table.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from '../SmallComponents/Error/Error';

function POSPage() {
    const navigate = useNavigate();
    const [tables, setTables] = useState([])
    const [number, setNumber] = useState("")
    const [seats, setSeats] = useState("")
    const [error, setError] = useState();


    const tableClick = event => {
        navigate(`/table/${event.target.id}`)
    }

    const addTable = event => {
        event.preventDefault();
        const newTable = {
            number: {number},
            seats: {seats}
        }  
        if (number === "" || seats === "") {
            setError(true)
        }
        else {
            setError(false)
            setTables([...tables, newTable])
        }
    }

    
    return (
        <div className="main-cabinet">
            <div className='shift-stats'>
                <h1 className='shift-stats__header'>Shift Stats:</h1> 
                <table>
                    <tbody className="shift-stats__table">
                        <tr className="shift-stats__table-row">
                            <td>Open tables:</td>
                            <td>{tables.length}</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Closed tables:</td>
                            <td>0</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Total Sales: $</td>
                            <td>0</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Total tips earned: $</td>
                            <td>0</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Kitchen tipout: $</td>
                            <td>0</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Bar tipout: $</td>
                            <td>0</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Host tipout: $</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <div className='tables'>
                <div className='tables__container'>
                        {tables?.map((table)=> (
                            <div onClick={tableClick} id={table.number.number} className='tables__table'>
                            <p className='tables__number'>{table.number.number}</p>
                        </div>
                        ))}
                </div>
                <form onSubmit={addTable}>
                    <Error error={error}/>
                    <div className="addform">
                        <input value={number} onChange={(e)=>setNumber(e.target.value)} className="addform__input" type="text" placeholder="table number"/>
                        <input value={seats} onChange={(e)=>setSeats(e.target.value)} className="addform__input" type="number" placeholder="number of people"/>
                    </div>
                    <Button type="submit" logo={tableLogo} text="Add Table"/>
                </form>
            </div>
        </div>
    )
}

export default POSPage