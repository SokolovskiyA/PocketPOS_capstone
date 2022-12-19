import React from 'react'
import './LogInForm.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';


function LogInForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    
    const userId = ReactSession.get("user_id")

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/${userId}`)
    }

    return (
        <div className='main-cabinet'>
            <div className="form-div">
                <form className="form-div__form" onSubmit={handleSubmit} >
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LogInForm