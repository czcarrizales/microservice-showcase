import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './Timestamp.css'

const Timestamp = () => {
    const [date, setDate] = useState('')
    const [unix, setUnix] = useState('')
    const [utc, setUtc] = useState('')
    const postRequest = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/date', {date: date})
        .then(res => {
            console.log(res.data)
            setUnix(res.data.unix)
            setUtc(res.data.utc)
        })
    }
    const handleInput = (event) => {
        setDate(event.target.value)
    }
  return (
    <div id='timestamp-container'>
        <h1>Timestamp Microservice</h1>
        <p>Input a valid date in YYYY-MM-DD format OR unix form to convert the date to unix and utc.</p>
    <form onSubmit={postRequest} method="post">
        <label>Regular Date</label>
        <input type="text" value={date} onChange={handleInput} />
        <input type="submit" />
    </form>
    <div>
        <h2>Unix</h2>
        {unix}
        <h2>UTC</h2>
        {utc}
    </div>
    </div>
  )
}

export default Timestamp