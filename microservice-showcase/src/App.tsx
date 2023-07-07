import { useState } from 'react'
import './App.css'
import Timestamp from './Timestamp'
import RequestHeaderParser from './RequestHeaderParser'
import UrlShortener from './UrlShortener'
import ExerciseTracker from './ExerciseTracker'
import FileMetadata from './FileMetadata'
import {Route, Routes} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/timestamp' element={<Timestamp />}></Route>
        <Route path='/requestheaderparser' element={<RequestHeaderParser />} />
        <Route path='/urlshortener' element={<UrlShortener />} />
        <Route path='/exercisetracker' element={<ExerciseTracker />} />
        <Route path='/filemetadata' element={<FileMetadata />} />
      </Routes>
    </>
  )
}

export default App
