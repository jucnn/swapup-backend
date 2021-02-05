/*
Import
*/
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
//


/*
Definition
*/
const SwapSchema = new Schema({
    objectWanted_id: Number,
    objectToExchange_id: Number,
    swap_sender: Number,
    swap_receiver: Number
});
//

/*
Export
*/
module.exports = mongoose.model("swap", SwapSchema);

//