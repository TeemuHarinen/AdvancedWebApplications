const mongoose = require('mongoose')

const Schema = mongoose.Schema

let categorySchema = {
  name: String
}

module.exports = mongoose.model("Category", categorySchema)