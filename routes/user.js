const express = require("express");
const router = express.Router();
const {handleGenerateShortURL,handleGetAnalytics}= require("../controllers/user");

router.route("/")
    .post(handleGenerateShortURL);

router.get("/analytics/:shortID",handleGetAnalytics);
module.exports = router;

