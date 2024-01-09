const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let todoSchema = new Schema({

    user: {type: String},
    items: {type: []}
});

module.exports = mongoose.model("todo", todoSchema);