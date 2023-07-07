import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div id='navbar-container'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/timestamp'>Timestamp</Link></li>
                <li><Link to='/requestheaderparser'>Request Header Parser</Link></li>
                <li><Link to='/urlshortener'>Url Shortener</Link></li>
                <li><Link to='/exercisetracker'>Exercise Tracker</Link></li>
                <li> <Link to='/filemetadata'>File Metadata</Link></li>




            </ul>
        </div>
    )
}

export default Navbar