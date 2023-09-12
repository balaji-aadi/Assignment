const express = require('express')
const router = express.Router()
const LostLead = require('../models/lostLead')

router.get('/getlost', async (req, res) => {
    try {
        const newLeads = await LostLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/lostLead', async (req, res) => {
    const createLeads = new LostLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
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

router.delete('/lost/:id', async (req, res) => {
    try {
        await LostLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router