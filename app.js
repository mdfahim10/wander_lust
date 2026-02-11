const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

// ----------------------- Mongo URL -----------------------
const MONGO_URL = "mongodb://127.0.0.1:27017/wander_lust";

// ----------------------- DB Connection -----------------------
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

// -------------------------- API -----------------------------
app.get("/", (req, res) => {
    res.send("Hi, I am Root");
});

// -------------------------- Sample Listing -----------------------
app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "Saif Ali Khan Villa",
        description:
            "A luxurious beachfront villa with a private pool and stunning sea view.",
        price: 55000,
        location: "Goa",
        country: "India",
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successful testing");
});

// ----------------------- PORT -----------------------
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
