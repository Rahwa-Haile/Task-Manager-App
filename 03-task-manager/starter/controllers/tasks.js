const Task = require('../models/Task')
const asyncWrapper = require('../middeware/async')
const {createCustomError} = require('../errors/custom-error')


const createTask = asyncWrapper(async (req, res)=>{
    // const task = await Task.create(req.body) //As you can see here we have asynchronous operation. If the user enters invalid data they will be left hanging because we are not handling the error here hence server will not respond in case of error.
    // res.status(201).json({ task })
    // try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    // }
    // catch (error){
    //     res.status(500).json({msg: error})
    // }
})

const getAllTasks = asyncWrapper(async (req, res)=>{
   
        const tasks = await Task.find({})
        // res.status(200).json({ tasks })//notice this just using the ES6 shorthand where if the property name is equal with the variable for the value we can omit the second part. So this is the same with { tasks: tasks }
        res.status(200).json({ success: true, data: tasks, noOfTasks: tasks.length })
    
   
    
})

const getTask = asyncWrapper(async (req, res, next)=>{
   
        const {id: TaskId} = req.params
        const task = await Task.findOne({ _id: TaskId}) 
    
        if(!task){
            // const error = new Error('not found')
            // error.status = 404
            // return next(error)

            return next(createCustomError(`The id ${TaskId} doesnot exist`, 404))
            
        }
        res.status(200).json({ task })
    
    
    
})
const deleteTask = asyncWrapper(async (req, res)=>{


        const{ id: TaskId } = req.params
        const task = await Task.findOneAndDelete({ _id: TaskId }) 

        if(!task){ 
            return next(createCustomError(`The id ${TaskId} doesnot exist`, 404))
        }
        res.status(200).json({ task })//This is just for now. Obviously our frontend doesn't care about the task being deleted. Later on we we will see how we can remove one and refresh to bring back the remaining tasks.
        // res.status(200).send()
        // res.status(200).json({ task: null, status: 'success'})// Both of these responses return back the rest of the tasks
})
const updateTask = asyncWrapper(async (req, res)=>{
    
        const { id: TaskId } = req.params
        // res.status(200).json({ id: TaskId, data: req.body})
        const task = await Task.findOneAndUpdate({ _id: TaskId}, req.body, {new: true, runValidators: true})

        if(!task){
            return next(createCustomError(`The id ${TaskId} doesnot exist`, 404))
        }
        res.status(200).json({ task })
})

const editTask = asyncWrapper(async (req, res)=>{
    
        const { id: TaskId } = req.params
        // res.status(200).json({ id: TaskId, data: req.body})
        const task = await Task.findOneAndUpdate({ _id: TaskId}, req.body, {new: true, runValidators: true, overwrite: true})

        if(!task){
            res.status(404).json({msg: `No task with an id of ${TaskId}`})
        }
        res.status(200).json({ task })
})


module.exports = {
    getAllTasks, 
    getTask,
    createTask,
    updateTask,
    deleteTask,
    editTask
} 