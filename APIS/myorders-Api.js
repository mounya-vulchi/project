const exp=require("express")
const myordersApiObj=exp.Router()
const asyncHandler=require("express-async-handler");


myordersApiObj.use(exp.json());



myordersApiObj.post("/addorder",asyncHandler( async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj");
    await myOrdersCollectionObj.insertOne(req.body);
    //console.log("the book is ",req.body);
    res.send({message:"Book added to myorders successfully"});

}))

myordersApiObj.get("/getorderitems/:userId",asyncHandler(async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj");
    let orders=await myOrdersCollectionObj.find({userId:req.params.userId}).toArray();
    //console.log("the orders are",orders)

    res.send({message:orders});
}))


//export
module.exports= myordersApiObj;