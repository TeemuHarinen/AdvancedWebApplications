const mongoose = require('mongoose')

const Schema = mongoose.Schema

let recipeSchema = new Schema({
    name: String,
    ingredients:[],
    instructions:[],
    categories: []
})

module.exports = mongoose.model("Recipe", recipeSchema)