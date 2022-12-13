import React from 'react'
import Button from '../SmallComponents/Button/Button'
import './POSPage.scss'
import tableLogo from '../../Assets/images/dining-table.png'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Error from '../SmallComponents/Error/Error';
import axios from 'axios';

function POSPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tables, setTables] = useState([])
    const [number, setNumber] = useState("")
    const [seats, setSeats] = useState("")
    const [error, setError] = useState();
    const api = "http://localhost:8081"
    const addTable = event => {
        event.preventDefault();
        const newTable = {
            table_number: number,
            table_seats: seats,
            restaurant_id: id
        }  
        const scan = tables.find(table => table.table_number === Number(number))
        const seatsNew = Array.from({length: seats}, (v, i) => i)
        console.log(seatsNew)
        /*
        if (number === "" || seats === "" || scan ) {
            setError(true)
        }
        else {
            setError(false)
            axios.post(`${api}/${id}/tables`, newTable)
            .catch((error) => {
                console.log("error");
            });
        }
        */
    }
    useEffect(() => {
        axios
            .get(`${api}/${id}/tables`)
            .then((res) => {
                setTables(res.data)
            })
            .catch((error) => {
                console.log("error");
            });
    }, [api, addTable]);

    const tableClick = (e, table) => {
        navigate(`/user/${id}/table/${table.table_number}`)
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
                            <div onClick={e => tableClick(e, table)} key={table.table_id} className='tables__table'>
                            <p className='tables__number'>{table.table_number}</p>
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