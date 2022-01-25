const express = require('express');
const router = require('./route');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use('/', router);

mongoose
  .connect('mongodb+srv://Rumman:121@cluster0.ybawo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => console.log("Connection Successful"))
  .catch((error) => console.log(error));

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.Message);
    }
  } else {
    res.send("Error");
  }
});

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
  console.log(`Food Delivery App Server Is Running On PORT ${PORT}`);
});