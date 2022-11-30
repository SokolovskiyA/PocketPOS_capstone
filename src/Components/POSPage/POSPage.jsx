import React from 'react'
import Button from '../SmallComponents/Button/Button'
import './POSPage.scss'
import tableLogo from '../../Assets/images/dining-table.png'
import { useState, useEffect } from "react";

function POSPage() {
    const [tables, setTables] = useState([])

    const addTable = event => {
        event.preventDefault();
        
    }
    return (
        <div className="POSscreen">
            <div className='POSscreen__tables tables'>
                {tables.map((table) => {
                    <div className='tables__table'>
                        <img className='tables__image' src={table.image}/>
                        <p className='tables__number'>{table.table_number}</p>
                    </div>
                })}
                <Button click={addTable} logo={tableLogo} class="POSscreen__button" text="Add Table"/>
            </div>
            <div className='shift-stats'>
                <h1 className='shift-stats__header'>Shift Stats:</h1> 
                <table>
                    <tbody>
                        <tr>
                            <td>Open tables:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Closed tables:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Total Sales:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Total tips earned:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Total tips earned:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Kitchen tipout:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Bar tipout:</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Host tipout:</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

export default POSPage