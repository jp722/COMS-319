const express = require('express');
const cors = require('cors');
const app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = 8081;
const host = 'localhost';
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'reactdata';
const client = new MongoClient(url);

// Connect to MongoDB
async function connectToMongoDB() {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    return db;
}

// GET all products
app.get('/products', async (req, res) => {
    const db = await connectToMongoDB();
    const products = await db.collection('fakestore_catalog').find({}).toArray();
    res.status(200).send(products);
});

// POST a new product
app.post('/addProduct', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection("fakestore_catalog");

        const newDocument = {
            "id": req.body.id, // also "id": req.body.id,
            "title": req.body.title, // also "title": req.body.name,
            "price": req.body.price, // also "price": req.body.price,
            "description": req.body.description, // also "description": req.body.description,
            "image": req.body.image, // also "image": req.body.imageUrl
            "rating": { "rate": req.body.rate, "count": req.body.count }
        };
        console.log(newDocument);
        const results = await db
            .collection("fakestore_catalog")
            .insertOne(newDocument);
        res.status(200).send(results);

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

//DELETE product
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const db = await connectToMongoDB();
        console.log("Product to delete :", id);
        const query = { id: id };
        // delete
        const results = await db.collection("fakestore_catalog").deleteOne(query);
        res.status(200);
        res.send(results);
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Uodate Price
app.put("/updateProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const db = await connectToMongoDB();
        const query = { id: id };
        console.log("Product to Update :", id);

        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {
            $set: {
                "price": req.body.price
            }
        };

        // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
        //const options = {};
        const results = await db.collection("fakestore_catalog").updateOne(query, updateData);
        res.status(200);
        res.send(results);
    } catch {
        console.error("Error updating product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }

});

app.listen(port, host, () => {
    console.log("App listening at http://%s:%s", host, port);
});
