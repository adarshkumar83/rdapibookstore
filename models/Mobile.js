const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mobileSchema = new Schema({
    modelName: { type:String },
    BrandName: { type:String },
    price:  { type: Number },
    RAM: { type: String },
    ROM: { type: String }
})
module.exports = mongoose.model('Mobile', mobileSchema)