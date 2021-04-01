const exp=require("express")
const wishlistApiObj=exp.Router()
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");

const jwt=require("jsonwebtoken");

wishlistApiObj.use(exp.json())

wishlistApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    let cartObj=req.body;
    //console.log(cartObj)
   
    let cart = await wishlistCollectionObj.findOne({booktitle:cartObj.booktitle,username:cartObj.username})
    
    if(cart!==null){
        res.send({message:"book already existed"})
    }
    else{
        await wishlistCollectionObj.insertOne(cartObj);
        res.send({message:"book added to wishlist successfully"})
    }
   
}))
wishlistApiObj.get("/getwishlistitems/:username",errHandler(async(req,res,next)=>{

    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");
    let products=await wishlistCollectionObj.find({username:req.params.username}).toArray();
    //console.log(products)

    res.send({message:products})
}))


wishlistApiObj.post("/deleteproduct",errHandler(async(req,res,next)=>{
   
    let wishlistCollectionObj = req.app.get("wishlistCollectionObj");
    let cartObj =  req.body;
 
    let product = await wishlistCollectionObj.findOne({booktitle:cartObj.booktitle});

    //product is there
    if(product!==null){
        let remove=await wishlistCollectionObj.deleteOne({booktitle:cartObj.booktitle});
        res.send({message:true});
    }

}))

//export
module.exports= wishlistApiObj;