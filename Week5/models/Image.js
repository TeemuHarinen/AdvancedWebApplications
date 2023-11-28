const mongoose = require('mongoose')

const Schema = mongoose.Schema

let imageSchema = new Schema({
    name: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer
})

module.exports = mongoose.model("Image", imageSchema)