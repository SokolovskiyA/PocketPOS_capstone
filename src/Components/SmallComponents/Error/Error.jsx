import React from 'react'
import './Error.scss'

function Error(error) {
    if (error.error === true ) {
        return (
            <div className="error">
                <p>!Please provide table information!</p>
            </div>
        )
    }
}

export default Error