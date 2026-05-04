const { listingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const methodOverride = require("method-override");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");

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
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"/public")));
// -------------------------- Home Route -----------------------
app.get("/", (req, res) => {
    res.redirect("/listings");
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
app.post("/listings", wrapAsync(async (req, res, next) => {

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
// -------------------------- Delete Route -------------------------
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


// ----------------------- PORT -----------------------
app.use((err, req, res, next)=>{
    res.send("Something went wrong!");
});
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
