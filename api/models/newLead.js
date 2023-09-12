const mongoose = require('mongoose')

const NewLeadSchema = new mongoose.Schema({
    "organization" :{type:String,require:true},
    "opportunity" :{type:String,require:true},
    "email" :{type:String,require:true},
    "countryCode" : {type:Number},
    "phonenumber" :{type:Number,require:true},
    "team" :{type:String,require:true},
    "type" :{type:String,require:true},
    "product" :{type:String,require:true},
    "countryName" : {type:String,require:true},
    "revenue" :{type:Number,require:true},
    "date" :{type:Date,require:true},
    "ratings" :{type:Number,require:true},
})

module.exports = mongoose.model("NewLead", NewLeadSchema);