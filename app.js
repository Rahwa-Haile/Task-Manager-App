const express = require('express')
const app = express()
const tasks = require('./03-task-manager/starter/routes/tasks')
const {connectDB} = require('./03-task-manager/starter/db/connect')
require('dotenv').config()
const notFound = require('./03-task-manager/starter/middeware/not-found')
const errorHandlerMiddleware = require('./03-task-manager/starter/middeware/error-handler')

app.use(express.static('./03-task-manager/starter/public'))
app.use(express.json())                                     
//routes
// app.get('/hello', (req, res)=>{
//     res.send('Task manager app')
// })

app.use('/api/v1/tasks', tasks) // This /api/v1/tasks is going to be the root route for all of the tasks router
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const start = async ()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`app is running at port ${PORT}`))
}

start()


