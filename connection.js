const mongoose = require("mongoose");

async function mongoDBConnect(url) {
    return mongoose.connect(url);
}

module.exports = {
    mongoDBConnect,
};