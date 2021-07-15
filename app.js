const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shoppinoxDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const productSchema = {
  name: String,
  cost: String,
  img: String,
  rating: String,
  make: String,
};

const contactSchema = {
  name: String,
  email: String,
  message: String,
};

const Product = mongoose.model("Product", productSchema);
const Contact = mongoose.model("Contact", contactSchema);

const laptop = new Product({
  name: "Gaming Laptop",
  cost: "₹90000",
  img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  rating: "⭐⭐⭐⭐",
  make: "Alienware",
});
// laptop.save();

const phone = new Product({
  name: "Smartfone 366",
  cost: "₹18000",
  img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=616&q=80",
  rating: "⭐⭐⭐",
  make: "Asus",
});

const shirt = new Product({
  name: "Nice Shirt",
  cost: "₹3000",
  img: "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
  rating: "⭐⭐⭐⭐⭐",
  make: "Cotton Knight",
});

// const defaultProducts = [laptop, phone, shirt];
// Product.insertMany(defaultProducts, function (err) {
//   if (!err) {
//     console.log("Items added!");
//   }
// });

// const cost = "₹90000";
// const desc = "Gaming Laptop";
// const imgSrc =
//   "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Product.find({}, function (err, results) {
    if (!err) {
      res.render("home", { products: results });
    }
  });
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const contact = new Contact({
    name: name,
    email: email,
    message: message,
  });
  contact.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/cart", function (req, res) {
  res.render("cart");
});

app.get("/product/:productId", function (req, res) {
  const requestedId = req.params.productId;

  Product.findOne({ _id: requestedId }, function (err, result) {
    if (!err) {
      res.render("product", {
        prodName: result.name,
        prodCost: result.cost,
        prodImg: result.img,
        prodRating: result.rating,
        prodMake: result.make,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
