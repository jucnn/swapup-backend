const mongoose = require('mongoose');

const ObjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    donationPercentage: {
        type: Number,
        required: true
    },
    association: {
        type: String,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('object', ObjectSchema);