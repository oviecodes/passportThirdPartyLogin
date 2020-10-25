

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const port = 3000

const app = express()

mongoose.connect(`mongodb://localhost:27017/thirdPartyauthwithSession`, 
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`connected to mongodb`)
    })
    .catch(e => {
        console.log(`something went wrong`)
    })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get(`/`, (req, res) => {
    res.status(200).json({ msg: 'welcome to the homepage' })
})

app.listen(port, () => {
    console.log(`app is running on ${port}`)
})
