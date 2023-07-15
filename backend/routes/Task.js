const express = require('express')
const router = express.Router()

const Task = require('../models/Task')
const auth = require('../middleware/auth.js')

router.post('/:userID', auth, async(req,res) =>{
   
    const userID = req.params.userID

    if(!userID){
        return res.status(400).json({
            error:'Un Authorized user!'
        })
    }
    const {title, description, dueDate, status} = req.body

    const taskBody={
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status,
        userID
    }
    
    if(!title || !description || !dueDate){
        return res.status(400).json({
            error:'All fields required'
        })
    }

    let task = new Task(taskBody)

     try {
        await task.save()
        res.json('Task created sucessfully!!')
    } catch (error) {
        console.log(error)
        res.status(500).send('server Error')
    }
})



router.get('/:userID', async(req,res)=>{
    const userID = req.params.userID
    try {
        const response = await Task.find({userID})
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
    }
})



router.get('/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const response = await Task.findById(id)
        res.status(200).json(response)
        if(!response){
            return res.status(404).send('Task does not exist')
        }

    } catch (err) {
        console.error(err)
    }
})



router.put('/:userID/:id', async(req, res)=>{

    try {
        let {id} = req.params
        const userID = req.params.userID
        const responseID = await Task.find({userID})
        if(responseID){
            let response = await Task.findByIdAndUpdate({_id:id}, req.body, {new:true})
            res.status(200).json(response)
            if(!response){
                return res.status(404).send('Task does not exist')
            }
        }
        else{
            return res.status(404).send('User does not have a task')
        }

    } catch (err) {
        console.error(err)
    }
})



router.delete('/:userID/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const userID = req.params.userID
        const responseID = await Task.find({userID})

        if(responseID){
            let response = await Task.findByIdAndDelete(id)
            res.status(200).send('Task Deleted!!')
        }else{
            res.status(400).send('No task by user')
        }
    } catch (err) {
        console.error(err)
    }
})


module.exports = router
