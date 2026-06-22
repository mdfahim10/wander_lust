const express = require("express");
const router = express.Router();

//Index
router.get("/", (req,res) =>{
    res.send("Get for POSTS");
});
//show 
router.get("/:id",(req,res)=>{
    res.send("Get for show POSTS id");
});
//post
router.post("/",(req,res)=>{
    res.send("POST for POSTS");
});
//Delete
router.delete("/:id",(req,res)=>{
    res.send("Delete  for POSTS id");
});

module.exports = router;