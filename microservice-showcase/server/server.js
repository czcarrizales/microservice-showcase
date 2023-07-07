const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const validUrl = require('valid-url')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/date', (req, res) => {
    console.log('WE GOT THE DATE POST REQUEST')
    console.log(req.body.date)
    let unixToValidDate = new Date(Number(req.body.date))
    if (req.body.date == '') {
        console.log('No input detected...')
        console.log({
            unix: Date.now(),
            utc: Date.now()
        })
        res.json({
            unix: Date.now(),
            utc: Date.now()
        })
    } else if (!isNaN(Date.parse(req.body.date))) {
        console.log('Converting date to unix!')
        res.json({
            unix: Date.parse(req.body.date),
            utc: new Date(req.body.date).toUTCString()
        })
    }
    else if (isNaN(Date.parse(req.body.date))) {
        if (isNaN(unixToValidDate)) {
            console.log('Invalid date...')
            res.json({
                unix: 'Invalid date...',
                utc: 'Invalid date...'
            })
        } else {
            console.log('Seems like this is already in unix form.')
            res.json({
                unix: Date.parse(unixToValidDate),
                utc: unixToValidDate.toUTCString()
            })
        }

    }
})

app.get('/header-parser', (req, res) => {
    res.json({
        ipaddress: req.socket.remoteAddress,
        language: req.headers['accept-lanugage'],
        software: req.headers['user-agent'],
        date: new Date().toUTCString(),
        host: req.headers.host
    })
})

// Model
const UrlSchema = new mongoose.Schema({
    original_url: String,
    short_url: Number
})

const Url = mongoose.model('Url', UrlSchema)

app.post('/api/shorturl', async (req, res) => {
    const urlCount = await Url.countDocuments()
    const url = new Url({
      original_url: req.body.url,
      short_url: urlCount + 1
    })
    
    
    if (validUrl.isWebUri(req.body.url)) {
      try {
        await url.save()
        res.json({
          original_url: req.body.url,
          short_url: urlCount + 1
        })
        console.log(url)
      } catch (error) {
        console.log(error)
      }
    } else {
    console.log(res.body)
      res.json({error: 'invalid url'})
    }
  })

  app.get('/shorturl/:number', (req, res) => {
    const originalUrl = Url.findOne({short_url: req.params.number})
      .then((data) => {
        res.redirect(data.original_url)
        console.log(data.original_url)
      } )
  })

// MODELS
const userSchema = new mongoose.Schema({
    username: String
  })
  const User = new mongoose.model("User", userSchema)
  
  const exerciseSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    description: String,
    duration: Number,
    date: Date
  })
  const Exercise = new mongoose.model("Exercise", exerciseSchema)
  
  // API REQUESTS
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
  });
  
  app.get('/api/users', (req, res) => {
    User.find({})
      .then((users) => {
        res.send(users)
      })
  })
  
  app.post('/api/users', (req, res) => {
    console.log(req.body)
    const newUser = new User({
      username: req.body.username
    })
  
    newUser.save()
      .then((data) => {
        console.log('User created!')
        console.log(data)
        res.send(data)
      })
      .catch((err) => {
        console.log('Error creating user...')
        console.log(err)
      })
  })
  
  app.post('/api/users/exercises', async (req, res) => {
    const user = await User.findById(req.body.userId)
      .then((data) => {
        console.log('Got user data by id!')
        console.log(data)
        return data
      })
    const newExercise = await new Exercise({
      userId: user._id,
      username: user.username,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    })
    await newExercise.save()
      .then((data) => {
        console.log('Exercise created!')
        console.log(data)
        res.json({
          _id: user._id,
          username: user.username,
          date: newExercise.date,
          duration: newExercise.duration,
          description: newExercise.description
        })
      })
      .catch((err) => {
        console.log('Error creating exercise...')
        console.log(err)
      })
  })
  
  app.post('/api/users/logs',  (req, res) => {
     Exercise.find({ userId: req.body.userId })
      .then((data) => {
        const logArray = data.map(d => {
          const date = new Date(d.date)
          return {
            description: d.description,
            duration: d.duration,
            date: date.toDateString(),
            
          }
        })
        res.json({
          _id: data.userId,
          username: data.username,
          count: data.length,
          log: logArray
        })
      })
      .catch((err) => {
        console.log(err)
      })
  })

app.listen(5000, () => {
    console.log('Server started on port 5000')
})