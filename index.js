const express=require("express");
const fs=require("fs");
const qr=require("qr-image");
const bodyParser=require("body-parser");

const port=800;

const app=express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("/",async(req,res)=>{
    try{
        let svg=qr.image(req.body.url,{type:"svg"});
        let steam=svg.pipe(fs.createWriteStream("./output.svg"));
        steam.on("finish",()=>{
            res.sendFile(__dirname+"/output.svg");
        });
        steam.on("error",(err)=>{
            res.send(err);
        })
    }
    catch(err){
        console.log(err);
        res.send("error");
    }
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})