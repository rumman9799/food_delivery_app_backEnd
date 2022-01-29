const mongoose = require('mongoose');

const tnxSchema = new mongoose.Schema({
    shopping_cart_id: {
        type: String
    },
    user_id: {
        type: String
    },
    total_amount: {
        type: String
    },
    date: {
        type: String
    }

});

const Tnx = new mongoose.model('Tnx', tnxSchema);
module.exports = Tnx;