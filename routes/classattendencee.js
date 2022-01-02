const express = require('express')
const { send } = require('process')
const { message } = require('statuses')
const router = express.Router()
const Attendence = require('../models/attendence')


//Getting all
router.get('/', async (req,res) => {
    try {
        const classattendencee = await Attendence.find()
        res.json(classattendencee)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
//Getting one
router.get('/:id', getAttendence, (req,res) => {
        res.json(res.attendence)

})

//Creating one
router.post('/', async (req,res) => {
    const attendence = new Attendence ({
        name: req.body.name,
        presentinclass: req.body.presentinclass
    })
    try {
        const newAttendence = await attendence.save()
        res.status(201).json(newAttendence)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//Updating one
router.patch('/:id', getAttendence, async (req,res) => {
   if(req.body.name !=null) {
       res.attendence.name = req.body.name
   }
   if(req.body.presentinclass !=null) {
    res.attendence.presentinclass = req.body.presentinclass
   }
   try {
       const updateadAttendence = await res.attendence.save()
       res.json(updateadAttendence)
   } catch (err) {
       res.status(400).json({message: err.message })
   }
   


})
//Deleting one
router.delete('/:id', getAttendence,async (req,res) => {
    try{
        await res.attendence.remove()
        res.json({message: 'Info Removed'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }


})

async function getAttendence(req, res, next) {
    let attendence
    try {
        attendence = await Attendence.findById(req.params.id)
        if (attendence == null) {
            return res.status(404).json({message: 'no one is present'})
        }
} catch (err) {
    return res.status(500).json({message: err.message})

}

    res.attendence = attendence
    next()
}



module.exports = router

