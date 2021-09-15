var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book");

var Book = mongoose.model(
  "book",
  mongoose.Schema({
    item_no: String,
    name: String,
    price: Number,
    quantity: Number,
  })
);
var Order = mongoose.model(
  "order",
  mongoose.Schema({
    name: String,
    phone: Number,
    address: String,
    quantity: Number,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));

app.get("/api/cart", function (req, res) {
  Book.find(function (err, carts) {
    if (err) res.send(err);
    res.json(carts);
  });
});

app.get("/api/cart/:id", function (req, res) {
  Book.findOne({ _id: req.params.id }, function (err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
});

app.post("/api/cart", function (req, res) {
  Book.create(req.body, function (err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
});
app.post("/api/order", function (req, res) {
  Order.create(req.body, function (err, order) {
    if (err) res.send(err);
    res.json(order);
  });
});

app.delete("/api/cart/:id", function (req, res) {
  Book.findOneAndRemove({ _id: req.params.id }, function (err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
});

app.put("/api/cart/:id", function (req, res) {
  var query = {
    item_no: req.body.item_no,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  Book.findOneAndUpdate({ _id: req.params.id }, query, function (err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000..");
});
