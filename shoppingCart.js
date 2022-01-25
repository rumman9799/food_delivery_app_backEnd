const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({

    name: [],
    food_type: {
        type: String,
    },
    count: {
        type: String,
    }
});

const ShoppingCart = new mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;