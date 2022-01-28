const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    restaurant_id: {
        type: String,
    },
    price: {
        type: String,
    },
    generalType: {
        type: String,

    },
    food_major_category: [],
    rating: {
        type: String,
    },
    image_link: {
        type: String
    }
});

const Food = new mongoose.model('Food', foodSchema);
module.exports = Food;
