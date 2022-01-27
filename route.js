const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('./user');
const Restaurant = require('./restaurant');
const Food = require('./food');
const ShoppingCart = require('./shoppingCart');
const Recipt = require('./recipt')

router.get('/home', (req, res) => {
    res.send('Food Delivery Service Home Page')
});

router.post('/reg',
    async (req, res) => {
        try {
            const phn = await User.find({ phone: req.body.phone });
            const eml = await User.find({ email: req.body.email })
            if (phn && phn.length > 0) {
                res.status(500).json({ Message: 'Phone Number Already Exist' });
            }
            else if (eml && eml.length > 0) {
                res.status(500).json({
                    Message: "Email Already Exist",
                });
            }
            else if (req.body.password != req.body.confirmpassword) {
                res.status(500).json({
                    Message: "Password Does Not Match",
                });
            }
            else {
                hashpassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hashpassword,
                    phone: req.body.phone
                });
                await newUser.save();
                res.status(200).json({
                    Message: "Signup was successful!",
                });
            }
        } catch {
            res.status(500).json({
                Message: "Signup failed!",
            });
        }
    });

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ $or: [{ phone: req.body.phone }, { email: req.body.phone }] });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                /*  const token = jwt.sign({
                     id: user[0]._id
                 },
                     "secret"
                 ); */
                res.status(200).json({
                    /* "access_token": 'Bearer ' + token,
                    "userid": user[0]._id,
                    "role": user[0].role, */
                    Message: "Login successful!"
                });
            } else {
                res.status(401).json({
                    Message: "Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                Message: "Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            Message: "Authetication failed!"
        });
    }
});

router.get('/restaurants', async (req, res) => {
    const rest = await Restaurant.find();
    res.json(rest)
});

router.get('/restaurants/:id', async (req, res) => {
    const fd = await Food.find({ restaurant_id: req.params.id });
    res.json(fd);
});

router.get('/restaurants/:id/:fid', async (req, res) => {
    const item = await Food.findOne({ _id: req.params.fid, restaurant_id: req.params.id });
    res.json(item);
})

router.post('/createshoppingcart', async (req, res) => {
    const newShoppingCart = new ShoppingCart({
        name: req.body.name,
        food_type: req.body.food_type,
        count: req.body.count
    });
    await newShoppingCart.save();
    res.status(200).json({
        Message: "ShoppingCart was successful!",
    });

})

router.post('/createrestaurant', async (req, res) => {
    const newRestaurant = new Restaurant({
        name: req.body.name,
        logo: req.body.logo,
        rating: req.body.rating,
        best_selling_food: req.body.best_selling_food
    })
    await newRestaurant.save();
    res.status(200).json({
        Message: "Resaturant Creation successful!",
    });

})

router.post('/createfood', async (req, res) => {
    const newFood = new Food({
        name: req.body.name,
        restaurant_id: req.body.restaurant_id,
        price: req.body.price,
        food_major_category: req.body.food_major_category,
        rating: req.body.rating,
        image_link: req.body.image_link,

    })
    await newFood.save();
    res.status(200).json({
        Message: "Food Creation successful!",
    });

})


router.post('/createrecipt', async (req, res) => {
    const newRecipt = new Recipt({
        date: req.body.date,
        total_price: req.body.total_price,
        delivery_time: req.body.delivery_time,
        restaurant_id: req.body.restaurant_id,
        user_id: req.body.user_id

    })
    await newRecipt.save();
    res.status(200).json({
        Message: "Recipt Creation successful!",
    });
})

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users)
})

router.get('/carts', async (req, res) => {
    const carts = await ShoppingCart.find();
    res.json(carts)
})

router.get('/cart/:id', async (req, res) => {
    const cart = await ShoppingCart.findOne({ _id: req.params.id });
    res.json(cart)
})

router.get('/recipts', async (req, res) => {
    const recipts = await Recipt.find();
    res.json(recipts)
})
router.get('/recipt/:id', async (req, res) => {
    const recipt = await Recipt.find({ _id: req.params.id });
    res.json(recipt)
})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        await User.deleteOne();
        res.json({ Message: 'Delete Complete' });
    }
    catch {
        res.json({ Error: 'Failed To Delete' });
    }
})

router.delete('/deleterestaurant/:id', async (req, res) => {
    try {
        await Restaurant.deleteOne();
        res.json({ Message: 'Delete Complete' });
    }
    catch {
        res.json({ Error: 'Failed To Delete' });
    }
})

router.delete('/deletefood/:id', async (req, res) => {
    try {
        await Food.deleteOne();
        res.json({ Message: 'Delete Complete' });
    }
    catch {
        res.json({ Error: 'Failed To Delete' });
    }
})

router.delete('/deletecart/:id', async (req, res) => {
    try {
        await ShoppingCart.deleteOne();
        res.json({ Message: 'Delete Complete' });
    }
    catch {
        res.json({ Error: 'Failed To Delete' });
    }
})

router.delete('/deleterecipt/:id', async (req, res) => {
    try {
        await Recipt.deleteOne();
        res.json({ Message: 'Delete Complete' });
    }
    catch {
        res.json({ Error: 'Failed To Delete' });
    }
})

module.exports = router;