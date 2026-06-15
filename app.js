const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const methodOverride = require("method-override");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");

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

app.use("/listings",listings)
// -------------------------- Review Validation Middleware -----------------------
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};



// -------------------------- Review Route -------------------------
//post route
app.post(
    "/listings/:id/reviews",
    validateReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        res.redirect(`/listings/${listing._id}`);
    })
);

// Delete Review Route
app.delete(
    "/listings/:id/reviews/:reviewId",
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(
            id,
            { $pull: { reviews: reviewId } }
        );
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);
    })
);
// 404 Handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;

    res.status(statusCode).render("error.ejs", { message });
});

// PORT
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});

