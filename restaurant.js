const mongoose = require('mongoose');

const restaurantschema = new mongoose.Schema({

    name: {
        type: String,
    },
    logo: {
        type: String,
    },
    rating: {
        type: String
    },
    best_selling_food: {
        type: String
    }
});

const Restaurant = new mongoose.model('Restaurant', restaurantschema);
module.exports = Restaurant;
