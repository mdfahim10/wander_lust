const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wander_lust";

// ----------------------- DB Connection -----------------------
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6a399eb6e0742a5b93797da3"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

main()
    .then(async () => {
        await initDB();
        mongoose.connection.close();
    })

    .catch((err) => {
        console.log(err);
    });
