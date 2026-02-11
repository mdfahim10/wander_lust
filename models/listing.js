const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default:
            "https://akm-img-a-in.tosshub.com/lingo/hmag/images/story/202507/686e1b599214e-pataudi-palace-saif-ali-khan-ibrahim-kothi-093340257-16x9.jpg?size=699:*",
        set: (v) =>
            v === ""
                ? "https://akm-img-a-in.tosshub.com/lingo/hmag/images/story/202507/686e1b599214e-pataudi-palace-saif-ali-khan-ibrahim-kothi-093340257-16x9.jpg?size=699:*"
                : v,
    },
    price:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
