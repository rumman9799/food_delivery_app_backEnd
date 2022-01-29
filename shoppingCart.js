const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({

    food_id: [],
    total_amount: {
        type: String,
    },
    status: {
        type: String,
    }
});

const ShoppingCart = new mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;