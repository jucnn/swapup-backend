/*
Import
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;
//

/*
Definition
*/
const SwapSchema = new Schema({
  objectWanted:  {
    type: Schema.Types.ObjectId,
    ref: 'object'  
  },
  objectToExchange:  {
    type: Schema.Types.ObjectId,
    ref: 'object'  
  },
  swap_sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  swap_receiver: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
//

/*
Export
*/
module.exports = mongoose.model("swap", SwapSchema);

//
