const exp=require("express")
const myordersApiObj=exp.Router()
const asyncHandler=require("express-async-handler");
const verifyToken = require("./middlewares/verifyToken");


myordersApiObj.use(exp.json());



myordersApiObj.post("/addorder",verifyToken,asyncHandler( async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj");
    await myOrdersCollectionObj.insertOne(req.body);
    res.send({message:"Book added to myorders successfully"});

}))

myordersApiObj.get("/getorderitems/:userId",verifyToken,asyncHandler(async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj");
    let orders=await myOrdersCollectionObj.find({userId:req.params.userId}).toArray();

    res.send({message:orders});
}))


//export
module.exports= myordersApiObj;