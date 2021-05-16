const express = require('express')
const app = express()

//Middleware
app.use(express.json())

//Temp Database for rooms
const rooms = [
    { name: "playPoker", password: "12345"},
    { name: "sangPoker", password: "playit98"},
    { name: "unclePoker", password: "rdr2letsgo"}
]

//Default Get Request 
app.get('/', (req,res) => {
    res.send('Hello World')
})

//GET Room Name & Password Request
app.get('/api/room/:name/:password', (req,res) =>{
    const room = rooms.find(r => r.name === req.params.name)
    if (!room) res.status(404).send(`The following ${req.params.name} has not been found. Please try again`)
    if(room.password != req.params.password){
        res.status(404).send(`Incorrect Password. Please try again`)
    }
    res.send(`Welcome to ${room.name}, please wait until the game starts`)
})

//POST Room Name & Password Request
app.post('/api/room', (req,res) => {
    //Input Validation
    if(!req.body.name || !req.body.password){
        res.status(400).send("Name or Password Required")
        return
    } else if(rooms.find(r => r.name === req.body.name)){
        res.status(400).send(`${req.body.name} has already been created.`)
        return
    }
    const room = {
        name: req.body.name,
        password: req.body.password
    }
    rooms.push(room)
    res.send(`${room.name} has been created. Please click the button below if you wish to start the game`)
    console.log(room.password)
}) 

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on ${port}`))
