const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const Listing = require("../models/listing.js");



// -------------------------- Index Route -----------------------
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});
// -------------------------- New Route -------------------------
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});
// -------------------------- Edit Route -------------------------
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});
// -------------------------- Show Route -------------------------
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show", { listing });
});
// -------------------------- Create Route -------------------------
router.post("/", wrapAsync(async (req, res, next) => {

    // 1️⃣ Get listing data from form
    const listingData = req.body.listing;

    // 2️⃣ Create new listing
    const newListing = new Listing({
        title: listingData.title,
        description: listingData.description,
        image: {
            url: listingData.image?.url || "",
            filename: "listingimage"
        },
        price: listingData.price,
        location: listingData.location,
        country: listingData.country
    });

    // 3️⃣ Save to database
    await newListing.save();

    // 4️⃣ Redirect after success
    res.redirect("/listings");

}));
// -------------------------- Update Route -------------------------
router.put("/:id", async (req, res) => {
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
// -------------------------- Delete Route -------------------------
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

module.exports = router;