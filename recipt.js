const mongoose = require('mongoose');

const reciptSchema = new mongoose.Schema({

    date: {
        type: String,
    },
    total_price: {
        type: String,
    },
    delivery_time: {
        type: String,
    },
    restaurant_id: {
        type: String,
    },
    user_id: {
        type: String,
    }

});

const Recipt = new mongoose.model('Recipt', reciptSchema);
module.exports = Recipt;
