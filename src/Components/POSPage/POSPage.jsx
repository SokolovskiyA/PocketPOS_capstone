import React from 'react'
import './POSPage.scss'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useCallback } from 'react';
import tableLogo from '../../Assets/images/dining-table.png'
import Button from '../SmallComponents/Button/Button'
import axios from 'axios';
import close from '../../Assets/icons/close.png'
import PopUp from '../SmallComponents/PopUp/PopUp';

function POSPage() {
    const userId = ReactSession.get("user_id")
    const api = ReactSession.get("server_api")
    const navigate = useNavigate();
    const [tables, setTables] = useState([])
    const [number, setNumber] = useState("")
    const [seats, setSeats] = useState("")
    const [shift, setShift] = useState({})
    const [shiftEnd, setShiftEnd] = useState(false)
    const [tableError, setTableError] = useState(false)
    
    const addTable = useCallback((event)=> { 
        event.preventDefault();
        const properSeats = Number(seats) + 1
        const newTable = {
            table_number: number,
            table_seats: properSeats,
            shift_id: shift.shift_id, 
            table_total: Number(), 
            table_tips: Number(),
            restaurant_id: shift.restaurant_id
        }  
        const scan = tables.find(table => table.table_number === Number(number))
        if (number === "" || seats === "" || scan ) {
            setTableError(true)
        }
        else {
            axios.post(`${api}/shift/tables`, newTable)
            .catch((error) => {
                console.log("error");
            });
        }
    }, [tables, api, number, seats, shift.restaurant_id, shift.shift_id])
    
    useEffect(() => {
        axios
            .get(`${api}/${userId}/shift`)
            .then((res) => {
                setShift(res.data[0])
            })
            .catch((error) => {
                console.log("error");
            });
    }, [api, userId]);
    
    useEffect(()=> {
        axios
            .get(`${api}/${shift.shift_id}/tables`)
            .then((res) => {
                setTables(res.data)
            })
            .catch((error) => {
                console.log("error");
            });
    },[api, shift, addTable])
    
    const closeShift = e => {
        e.preventDefault()
        if (tables.length === 0) {
            axios
            .delete(`${api}/${userId}}/shift/${shift.shift_id}`)
            .then((res)=> {
                console.log(res)
            })
            .catch((error) => {
                console.log("error");
            });
        navigate(`/${userId}`)
        }
        else {
            setShiftEnd(true)
        }
    }
    function closePop() {
        setShiftEnd(false)
        setTableError(false)
    }
    return (
        <div className="main-cabinet">
        {shiftEnd === true && <PopUp closePop={closePop} text="Please close all tables"/>}
        {tableError === true && <PopUp closePop={closePop} text="Please provide new table information"/>}
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
                            <td>{shift.shift_closedTables}</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Total Sales: $</td>
                            <td>{shift.shift_sales}</td>
                        </tr>
                        <tr className="shift-stats__table-row">
                            <td>Total tips earned: $</td>
                            <td>{shift.shift_tips}</td>
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
                            <td>0</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <Button click={closeShift} text="close shift" logo={close} />
            <div className='tables'>
                <div className='tables__container'>
                        {tables?.map((table)=> (
                            <div onClick={e => navigate(`/${userId}/shift/${table.table_id}`)} key={table.table_id} className='tables__table'>
                            <p className='tables__number'>{table.table_number}</p>
                        </div>
                        ))}
                </div>
                <form onSubmit={addTable}>
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