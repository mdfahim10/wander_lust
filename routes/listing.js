const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const Listing = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");



// -------------------------- Index Route -----------------------
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});
// -------------------------- New Route -------------------------
router.get("/new", isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});
// -------------------------- Edit Route -------------------------
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
});
// -------------------------- Show Route -------------------------
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
});
// -------------------------- Create Route -------------------------
router.post(
    "/",
    isLoggedIn,
    wrapAsync(async (req, res) => {

        const listingData = req.body.listing;

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

        newListing.owner = req.user._id;

        await newListing.save();

        req.flash("success", "New Listing Created!");

        res.redirect("/listings");
    })
);
// -------------------------- Update Route -------------------------
router.put("/:id", isLoggedIn, async (req, res) => {
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

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
});
// -------------------------- Delete Route -------------------------
router.delete("/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
});

module.exports = router;