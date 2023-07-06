import { useState } from 'react'
import './App.css'
import Timestamp from './Timestamp'
import RequestHeaderParser from './RequestHeaderParser'

function App() {

  return (
    <>
    <ul>
      <li><a href='#'>Timestamp</a></li>
    </ul>
      <Timestamp />
      <RequestHeaderParser />
    </>
  )
}

export default App
