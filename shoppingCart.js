const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    food_type: {
        type: String,
    },
    count: {
        type: String,
    }
});

const ShoppingCart = new mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;