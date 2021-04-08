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



myordersApiObj.get("/getorderitems/:username",asyncHandler(async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj");
    let orders=await myOrdersCollectionObj.find({username:req.params.username}).toArray();
    //console.log("the orders are",orders)

    res.send({message:orders})
}))



myordersApiObj.post("/clear",asyncHandler(async(req,res,next)=>{
   
    let myOrdersCollectionObj = req.app.get("myOrdersCollectionObj");
    let orderObj =  req.body;
   
    //console.log("user object is",orderObj);

    let book = await myOrdersCollectionObj.findOne({booktitle:orderObj.booktitle});

    //book is there
    if(book!==null){
        let remove=await myOrdersCollectionObj.deleteOne({booktitle:orderObj.booktitle});
        res.send({message:"My order cleard successfully"});
    }
    else{
        res.send({message:"book not found in myorder"})
    }

}))

//export
module.exports= myordersApiObj;