import React from 'react'
import { useState } from 'react'

function LogInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        console.log(username, password)
    }

    return (
        <form onSubmit={handleSubmit} className='logIn'>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default LogInForm