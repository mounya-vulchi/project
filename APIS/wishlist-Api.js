const exp=require("express")
const wishlistApiObj=exp.Router()
const errHandler=require("express-async-handler");
const verifyToken = require("./middlewares/verifyToken");


wishlistApiObj.use(exp.json())

wishlistApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    let cartObj=req.body;

   
    let cart = await wishlistCollectionObj.findOne({booktitle:cartObj.booktitle,userId:cartObj.userId})
    
    if(cart!==null){
        res.send({message:"book already existed"})
    }
    else{
        await wishlistCollectionObj.insertOne(cartObj);
        res.send({message:"book added to wishlist successfully"})
    }
   
}))
wishlistApiObj.get("/getwishlistitems/:userId",verifyToken,errHandler(async(req,res,next)=>{

    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");
    let products=await wishlistCollectionObj.find({userId:req.params.userId}).toArray();


    res.send({message:products})
}))


wishlistApiObj.post("/deleteproduct",verifyToken,errHandler(async(req,res,next)=>{
   
    let wishlistCollectionObj = req.app.get("wishlistCollectionObj");
    let cartObj =  req.body;
 
    let product = await wishlistCollectionObj.findOne({booktitle:cartObj.booktitle,userId:cartObj.userId});

    //product is there
    if(product!==null){
        let remove=await wishlistCollectionObj.deleteOne({booktitle:cartObj.booktitle,userId:cartObj.userId});
        res.send({message:true});
    }

}))

//export
module.exports= wishlistApiObj;