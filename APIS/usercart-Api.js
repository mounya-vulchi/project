const exp=require("express");
const userCartApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");
//const { isJSDocUnknownTag } = require("typescript");
const jwt=require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

userCartApiObj.use(exp.json())

userCartApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let cartCollectionObj=req.app.get("cartCollectionObj")
    let cartObj=req.body;
    //console.log(cartObj)
    let cart = await cartCollectionObj.findOne({booktitle:cartObj.booktitle,userId:cartObj.userId})
    //console.log("the cart is ",cart)
   // console.log("product")
    if(cart!==null){
        res.send({message:"book already existed"})
    }
    else{
        await cartCollectionObj.insertOne(cartObj);
        res.send({message:"book added successfully"})
    }
   
   
    //console.log("product is ", obj)
}))

userCartApiObj.get("/getcartitems/:userId",verifyToken,errHandler(async(req,res,next)=>{
    //console.log("printing from get activity")
    let cartCollectionObj=req.app.get("cartCollectionObj");
    let booksCollectionObj=req.app.get("booksCollectionObj");
    let books=await booksCollectionObj.find().toArray();
    let products=await cartCollectionObj.find({userId:req.params.userId}).toArray();
    //console.log(products)

    res.send({message:products,booksArray:books})
}))



userCartApiObj.get("/getsize/:userId",verifyToken,errHandler(async(req,res,next)=>{
    let cartCollectionObj= req.app.get("cartCollectionObj");
    let cart=await cartCollectionObj.find({userId:req.params.userId}).toArray();
    let cartlength=cart.length;
    res.send({cartsize:cartlength});
    //console.log("the size is ",cartlength);
}))

userCartApiObj.post("/deleteproduct",verifyToken,errHandler(async(req,res,next)=>{
   
    let cartCollectionObj = req.app.get("cartCollectionObj");
    let cartObj =  req.body;
   
    //console.log("user object is",cartObj);
    //check for user in db
    let product = await cartCollectionObj.findOne({booktitle:cartObj.booktitle,userId:cartObj.userId});

    //product is there
    if(product!==null){
        let remove=await cartCollectionObj.deleteOne({booktitle:cartObj.booktitle,userId:cartObj.userId});
        res.send({message:"Book removed from cart successfully"});
    }
    else{
        res.send({message:"book not found in usercart"})
    }

}))


//export userapiobj
module.exports=userCartApiObj;




