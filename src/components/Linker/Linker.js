import React from 'react'
import { Link } from 'react-router-dom'
import './Linker.css'

export default function Linker() {
    return (
        <div className='Linker'>
            <img src='/images/logo-fii.png' alt="logo-fii.png" />
            <h3>FII UAIC 2021</h3>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/home'>Home</Link>
        </div>
    )
}

