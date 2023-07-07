import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div id='home-container'>
        <h1>Microservice Showcase</h1>
        <p>Collection of microservices created by me!</p>
        <div id='home-buttons'>
            <button className='home-button' id='home-timestamp'>Timestamp</button>
            <button className='home-button' id='home-header'>Header Parser</button>
            <button className='home-button' id='home-url'>Url Shortener</button>
            <button className='home-button' id='home-exercise'>Exercise Tracker</button>
            <button className='home-button' id='home-file'>File Metadata</button>
        </div>
    </div>
  )
}

export default Home