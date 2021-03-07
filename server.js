const express = require('express')
const app = express()

//Temp Database for rooms
const rooms = [
    { name: "playPoker", password: "12345"},
    { name: "sangPoker", password: "playit98"},
    { name: "unclePoker", password: "rdr2letsgo"}
]

//Basic Get Request 
app.get('/', (req,res) => {
    res.send('Hello World')
})

//GET RoomName Request (Room Routing)
//Password Validation has not been built yet
app.get('/api/room/:name/:password', (req,res) =>{
    let roomname = req.params.name
    rooms.forEach(function(index){
        if(roomname == index.name){
            res.send(`Welcome to ${roomname}, please wait until the game starts`)
        }
    })
    // res.send(`${roomname} does not exist in our database. Please try again`)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on ${port}`))
