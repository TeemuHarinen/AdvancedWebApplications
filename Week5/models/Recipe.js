const mongoose = require('mongoose')

const Schema = mongoose.Schema

let recipeSchema = new Schema({
    name: String,
    ingredients:[],
    instructions:[],
    categories: [],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})

module.exports = mongoose.model("Recipe", recipeSchema)