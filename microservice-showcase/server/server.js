const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
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

app.listen(5000, () => {
    console.log('Server started on port 5000')
})