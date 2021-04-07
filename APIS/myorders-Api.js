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

//export
module.exports= myordersApiObj;