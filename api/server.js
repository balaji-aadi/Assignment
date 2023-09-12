const express = require('express')
const app = express()
const mongoose = require('mongoose')
const NewLead = require('../api/models/newLead')
const ProposalLead = require('../api/models/proposalLead')
const QualifiedLead = require('../api/models/qualifiedLead')
const WonLead = require('../api/models/wonLead')
const LostLead = require('../api/models/lostLead')
const cors = require('cors')

const url = 'mongodb://localhost:27017/lead'
mongoose.connect(url).then(() => console.log('db is connected')).catch(err => console.log(err))

app.use(express.json())
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))


app.get('/', async (req, res) => {
    try {
        const newLeads = await NewLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.get('/getqualified', async (req, res) => {
    try {
        const newLeads = await QualifiedLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


app.get('/getproposal', async (req, res) => {
    try {
        const newLeads = await ProposalLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


app.get('/getwon', async (req, res) => {
    try {
        const newLeads = await WonLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


app.get('/getlost', async (req, res) => {
    try {
        const newLeads = await LostLead.find()
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


app.get('/:id', async (req, res) => {
    try {
        const newLeads = await NewLead.findById(req.params.id)
        res.status(200).json(newLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/createLead', async (req, res) => {
    const createLeads = new NewLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/proposalLead', async (req, res) => {
    const createLeads = new ProposalLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/qualifiedLead', async (req, res) => {
    const createLeads = new QualifiedLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/wonLead', async (req, res) => {
    const createLeads = new WonLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/lostLead', async (req, res) => {
    const createLeads = new LostLead(req.body)

    try {
        const savedLeads = await createLeads.save()
        res.status(200).json(savedLeads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.put('/update/:id', async (req, res) => {
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

app.delete('/new/:id', async (req, res) => {
    try {
        await NewLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.delete('/proposal/:id', async (req, res) => {
    try {
        await ProposalLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.delete('/qualified/:id', async (req, res) => {
    try {
        await QualifiedLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.delete('/won/:id', async (req, res) => {
    try {
        await WonLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.delete('/lost/:id', async (req, res) => {
    try {
        await LostLead.findByIdAndDelete(req.params.id)
        res.status(200).json("Lead is deleted");
    }
    catch (err) {
        return res.status(500).json(err)
    }
})


app.listen(5000, () => {
    console.log('server is started')
})