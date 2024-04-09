const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {mongoDBConnect} = require("./connection");
//const { restrictToLoggedinUserOnly } = require("./middleware/auth");
const URL = require("./models/url");

const urlRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user1");

const app = express();
const PORT = 8001;

mongoDBConnect("mongodb://localhost:27017/short-url").then(()=>
    console.log("MongoDB Connected")
);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended : false})); //for parsing FORM Data
app.use(cookieParser());
//URL Routes


//app.use("/url",restrictToLoggedinUserOnly, urlRouter);
app.use("/user",userRouter);
app.use("/",staticRouter);

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls,
    }); 
});



app.get("/:shortID",async(req,res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID,
    },
    {
        $push : {
            visitHistory : {
                timestamp : Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>console.log(`Server started at PORT : ${PORT}`));