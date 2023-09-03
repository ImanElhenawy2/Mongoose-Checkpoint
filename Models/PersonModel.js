let mongoose = require("mongoose");
let validator = require("validator");

let PersonsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            value.length <= 30 && 
            value.length != 0
           }
    },
    age: Number,
    favoriteFood: [String]
});


module.exports = mongoose.model("person", PersonsSchema);