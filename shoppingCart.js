const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({

    cart_items: [],
    total_amount: {
        type: String,
    },
    status: {
        type: String,
    },
    user_id: {
        type: String,
    }
});

const ShoppingCart = new mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;