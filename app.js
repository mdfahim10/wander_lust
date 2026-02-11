const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");



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

// ------------------------- View Engine -----------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------------- Home -----------------------------
app.get("/", (req, res) => {
    res.send("Hi, I am Root");
});

// -------------------------- Index Route -----------------------
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});
// -------------------------- New Route -------------------------
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
// -------------------------- Show Route -------------------------
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});
// -------------------------- Create Route -------------------------
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
// ----------------------- PORT -----------------------
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
