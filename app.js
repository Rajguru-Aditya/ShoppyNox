const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shoppinoxDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const contactSchema = {
  name: String,
  email: String,
  message: String,
};

const Contact = mongoose.model("Contact", contactSchema);

const cost = "₹90000";
const desc = "Gaming Laptop";
const imgSrc =
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { cost: cost, desc: desc, imgSrc: imgSrc });
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

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
