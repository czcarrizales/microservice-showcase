import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const UrlShortener = () => {

    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')

    const urlPostRequest = (event) => {
        event?.preventDefault()
        axios.post('http://localhost:5000/api/shorturl', {url: url})
        .then((res) => {
            setShortUrl(res.data.short_url)
            console.log(res.data.short_url)
        })
    }

    const handleInput = (e) => {
        setUrl(e.target.value)
        console.log(url)
    }
  return (
    <div>
        <h2>Enter a valid url</h2>
        <form onSubmit={urlPostRequest} action="" method="post">
            <input type="text" value={url} onChange={handleInput} />
            <input type="submit" />
        </form>
        <h3>Your short url is...</h3>
        <p>http://localhost:5000/shorturl/{shortUrl}</p>
    </div>
  )
}

export default UrlShortener