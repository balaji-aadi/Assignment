const express = require('express')
const router = express.Router()
const ProposalLead = require('../models/proposalLead')

router.get('/getproposal', async (req, res) => {
    try {
        const newLeads = await ProposalLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


router.post('/proposalLead', async (req, res) => {
    const createLeads = new ProposalLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})



router.delete('/proposal/:id', async (req, res) => {
    try {
        await ProposalLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router