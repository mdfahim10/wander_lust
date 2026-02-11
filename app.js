const methodOverride = require("method-override");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
// -------------------------- Edit Route -------------------------
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});
// -------------------------- Show Route -------------------------
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});
// -------------------------- Create Route -------------------------
app.post("/listings", async (req, res) => {
    const listingData = req.body.listing;

    const newListing = new Listing({
        title: listingData.title,
        description: listingData.description,
        image: {
            url: listingData.image.url,
            filename: "listingimage"
        },
        price: listingData.price,
        location: listingData.location,
        country: listingData.country
    });

    await newListing.save();
    res.redirect("/listings");
});


// -------------------------- Update Route -------------------------
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listingData = req.body.listing;

    await Listing.findByIdAndUpdate(id, {
        title: listingData.title,
        description: listingData.description,
        image: {
            url: listingData.image.url,
            filename: "listingimage"
        },
        price: listingData.price,
        location: listingData.location,
        country: listingData.country
    });

    res.redirect(`/listings/${id}`);
});



// ----------------------- PORT -----------------------
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
