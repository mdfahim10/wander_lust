const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const {isLoggedIn,isOwner}=require("../middleware.js");
const listingController = require("../controllers/listing.js");
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
router.get("/", wrapAsync(listingController.index));
router.get("/new",isLoggedIn,listingController.renderNewForm);
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
router.get("/:id",wrapAsync(listingController.showListing));
router.post("/",isLoggedIn,wrapAsync(listingController.createListing));
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
module.exports = router;