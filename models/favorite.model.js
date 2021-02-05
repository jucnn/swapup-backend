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
const FavoriteSchema = new Schema({
    id: String,
    user_id: String,
    object_id: String,
});
//

/*
Export
*/
module.exports = mongoose.model("favorite", FavoriteSchema);

//