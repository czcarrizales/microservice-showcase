import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './ExerciseTracker.css'

const ExerciseTracker = () => {

    const [username, setUsername] = useState('')
    const [exercise, setExercise] = useState({
        userId: '',
        description: '',
        duration: 0,
        date: ''
    })
    const [userId, setUserId] = useState('')

    const getAllUsers = () => {
        axios.get('http://localhost:5000/api/users')
        .then((data) => {
            console.log(data)
        })
    }

    const createNewUser = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/users', {username: username})
        .then((res) => {
            console.log(res)
        })
    }

    const handleUserInput = (e) => {
        setUsername(e.target.value)
    }

    const handleExerciseInput = (e) => {
        setExercise({...exercise, [e.target.id]: e.target.value})
        console.log(exercise)
    }

    const handleUserIdInput = (e) => {
        setUserId(e.target.value)
    }

    const addNewExercise = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/users/exercises', exercise)
        .then((res) => {
            console.log(res)
        })
    }

    const getAllExercisesFromUser = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/users/logs', {userId: userId})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  return (
    <div id='exercise-container'>
        <h2>Exercise Tracker</h2>
        <button onClick={getAllUsers}>Get all users</button>
        {}
        <h3>Create new user</h3>
        <form onSubmit={createNewUser} action="">
            <label>Username</label>
            <input type="text" value={username} onChange={handleUserInput} />
            <input type="submit" />
        </form>
        <h3>Create new exercise for user</h3>
        <form onSubmit={addNewExercise} action="">
            <label>User ID</label>
            <input onChange={handleExerciseInput} type="text" value={exercise.userId} id='userId'/>
            <br />
            <label htmlFor="">Description</label>
            <input onChange={handleExerciseInput} type="text" value={exercise.description} id='description'/>
            <br />
            <label htmlFor="">Duration</label>
            <input onChange={handleExerciseInput} type="number" value={exercise.duration} id='duration'/>
            <br />
            <label htmlFor="">Date</label>
            <input onChange={handleExerciseInput} type="text" value={exercise.date} id='date'/>
            <br />
            <input type="submit" />
        </form>
        <h3>Get All Exercises By User Id</h3>
        <form onSubmit={getAllExercisesFromUser} action="">
            <label htmlFor="">User Id</label>
            <input type="text" value={userId} onChange={handleUserIdInput} />
            <input type="submit" />
        </form>
    </div>
  )
}

export default ExerciseTracker