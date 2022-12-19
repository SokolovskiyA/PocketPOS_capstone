import React from 'react'
import './LogInForm.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import Button from '../SmallComponents/Button/Button';
import login from '../../Assets/icons/log-in.png'


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
                <form className="form-div__form" onSubmit={handleSubmit}>
                    <label className='subheader'>username</label> 
                    <input className='form-div__input' type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <label className='subheader'>password</label>
                    <input className='form-div__input' type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <Button type="submit" class="form-div__button" text="LogIn" logo={login}/>
                </form>
            </div>
        </div>
    )
}

export default LogInForm