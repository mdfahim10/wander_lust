const express = require("express");
const router = express.Router();

//Index
router.get("/", (req,res) =>{
    res.send("Get for users");
});
//show 
router.get("/:id",(req,res)=>{
    res.send("Get for show users id");
});
//post
router.post("/",(req,res)=>{
    res.send("POST for users");
});
//Delete
router.delete("/:id",(req,res)=>{
    res.send("Delete  for users id");
});

module.exports = router;
