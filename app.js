const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path")

// ----------------------- Mongo URL -----------------------
const MONGO_URL = "mongodb://127.0.0.1:27017/wander_lust";

// ----------------------- DB Connection -----------------------
async function main() {
    await mongoose.connect(MONGO_URL);
}
//-------------------------View Engine-----------------------------
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
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
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
// ----------------------- PORT -----------------------
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
