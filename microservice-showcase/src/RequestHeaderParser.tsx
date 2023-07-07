import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const RequestHeaderParser = () => {
    const [data, setData] = useState()
    const requestHeaderParser = () => {
        axios.get('http://localhost:5000/header-parser')
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        })
    }
  return (
    <div className="container">
        <h2>Request Header Parser Microservice</h2>
        <p>Get information about your headers!</p>
        <button onClick={requestHeaderParser}>Get Header</button>
        <div>
            <p>IP ADDRESS: {data?.ipaddress}</p>
            <p>SOFTWARE: {data?.software}</p>
            <p>DATE: {data?.date}</p>
            <p>HOST: {data?.host}</p>
            
        </div>
      </div>
  )
}

export default RequestHeaderParser