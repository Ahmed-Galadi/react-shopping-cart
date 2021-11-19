const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shopping-app-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number
}))

app.get("/api/products", async (request, response) => {
    const products = await Product.find({});
    response.send(products);
})

app.post("/api/products", async (request, response) => {
    const newProduct = new Product(request.body);
    const savedProduct = await newProduct.save();
    response.send(savedProduct);
})

app.delete("/api/products/:id", async (request, response) => {
    const deletedProduct = await Product.findByIdAndDelete(request.params.id);
    response.send(deletedProduct);
})

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log("server at http://localhost:5000") });