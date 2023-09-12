const express = require('express')
const router = express.Router()
const NewLead = require('../models/newLead')

router.get('/', async (req, res) => {
    try {
        const newLeads = await NewLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/createLead', async (req, res) => {
    const createLeads = new NewLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const newLeads = await NewLead.findById(req.params.id)
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const lead = await NewLead.findByIdAndUpdate(req.params.id,
            {
                $set : req.body
            },
            {new:true}
        )
        res.status(200).json(lead);
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.delete('/new/:id', async (req, res) => {
    try {
        await NewLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router