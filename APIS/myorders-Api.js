const exp=require("express")
const myordersApiObj=exp.Router()
const asyncHandler=require("express-async-handler");




myordersApiObj.post("/add",asyncHandler( async(req,res,next)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj")


         console.log("the order obj is",req.dody)

    
    // let cart = await myOrdersCollectionObj.findOne({booktitle:cartObj.booktitle,username:cartObj.username})

    // if(cart!==null){
    //     res.send({message:"book already existed"})
    // }
    // else{
    //     await myOrdersCollectionObj.insertOne(cartObj);
    //     res.send({message:"book added successfully"})
    // }
   
   
    //console.log("product is ", obj)
}))

//export
module.exports= myordersApiObj;