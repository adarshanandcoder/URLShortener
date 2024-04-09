const {shortid} = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL (req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url is required"});
    const shortID = shortid();
    await URL.create({
        shortID: shortID,
        redirectURL : body.url,
        visitHistory : [], 
    });

    return res.render("home",{
        id : shortID,
    });
    //return res.json({id : shortID});
}

async function handleGetAnalytics (req,res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({
        totalCLicks : result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
};