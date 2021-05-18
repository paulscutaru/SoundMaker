import React from 'react'
import './PageNotFound.css'
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className='page-not-found'>
            <h1>Page Not Found!</h1>
            <h3><Link to="/">Redirect Link</Link></h3>
        </div>
    )
};
