const express = require("express");
const {handleGetSignUp, handleGetLogIn} = require("../controllers/user1");

const router = express.Router();

router.post("/",handleGetSignUp);
router.post("/login",handleGetLogIn);

module.exports = router;
