const exp=require("express");
const userApiObj=exp.Router();

const asyncHandler=require("express-async-handler");

//extract body of req obj
userApiObj.use(exp.json());

//import bcrypt
const bcryptjs=require("bcryptjs");

const verifyToken=require("./middlewares/verifyToken");

const jwt=require("jsonwebtoken")



//import cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer=require("multer")


//coudinary configuration
cloudinary.config({
    cloud_name:'degojbpfy',
    api_key:'317337362233278',
    api_secret: 'C2y3Bl3f_nujcqgFd0im0UohNHE'
    });

//cloudinary storage configuration
const storage = new CloudinaryStorage({
     cloudinary: cloudinary, 
     params:async (req, file) => {
          return { 
              folder: 'bookstore',
               public_id: file.fieldname + '-' + Date.now() 
            }}
        });

//multer middleware configuation
var upload = multer({ storage: storage });






//post req handler for user register
userApiObj.post("/register",upload.single('photo'), asyncHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObj = req.app.get("userCollectionObj");
   
   
    let userObj =  JSON.parse(req.body.userObj)
    
    //check for user in db
    let user = await userCollectionObj.findOne({username:userObj.username});

    //if username alreaddy taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
      
        //hash the password
        let hashedpwd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpwd;
        userObj.userImgLink = req.file.path;

        //create user
        let success=await userCollectionObj.insertOne(userObj);
        res.send({message:"user created"});
          
    }
}))


//user login
userApiObj.post("/login",asyncHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObj = req.app.get("userCollectionObj");

    let userCredObj = req.body;
    
    //verify  username
    let user = await userCollectionObj.findOne({username:userCredObj.username})

    if(user == null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({userId:user.userId},"abcd",{expiresIn:1000});
            
            //send token
            res.send({message:"success",signedToken:token,userId:user.userId});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))

//get all users
userApiObj.get("/getusers",verifyToken,asyncHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObj");
    let allUsers=await userCollectionObject.find().toArray();
    res.send({users:allUsers})
}))
//get user
userApiObj.get("/getuser/:userId",verifyToken,asyncHandler(async(req,res,next)=>{
    //get user usercollection object
    let userCollectionObject=req.app.get("userCollectionObj")
    let userObj=await userCollectionObject.findOne({userId:parseInt(req.params.userId)});
    res.send({message:"success",user:userObj})
    
}))

//update userprofile
userApiObj.put("/updateprofile",upload.single('photo'),verifyToken,asyncHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObj");

    let userObj =  JSON.parse(req.body.userObj)

    let user=await userCollectionObject.findOne({userId:userObj.userId});

    if(user!==null){
        if(user.password!==userObj.password){
            console.log("the password is different");
            let hashedpwd = await bcryptjs.hash(userObj.password,6);
            userObj.password = hashedpwd;
        }
       
         let edit=await userCollectionObject.updateOne({userId:userObj.userId},{$set:{
            username:userObj.username,
            email:userObj.email,
            password:userObj.password,
            phonenumber:userObj.phonenumber,
            address:userObj.address,
            city:userObj.city,
            state:userObj.state,
            pincode:userObj.pincode
        }});
     
        res.send({message:true});
    }
    else{
        res.send({message:"user not found"});
    }
    
}))
//delete user
userApiObj.post("/deleteuser",asyncHandler(async(req,res,next)=>{
    //get user usercollection object
    let userCollectionObject=req.app.get("userCollectionObj");
    let cartCollectionObject=req.app.get("cartCollectionObj");
    let wishlistCollectionObj=req.get("wishlistCollectionObj");
    let myOrdersCollectionObj=req.get("myOrdersCollectionObj");
    console.log("the user is ",req.body)
    let userObj=await userCollectionObject.findOne({userId:req.body.userId});
    let cartObj=await cartCollectionObject.find({userId:req.body.userId}).toArray();
    let wishObj=await wishlistCollectionObj.find({userId:req.body.userId}).toArray();
    let myorderObj=await myOrdersCollectionObj.find({userId:req.body.userId}).toArray();
    if(userObj!=null){
        await userCollectionObject.deleteOne({userId:req.body.userId});
        if(cartObj!=null){
            await cartCollectionObject.delete({userId:req.body.userId});
        }
        if(wishObj!=null){
            await wishlistCollectionObj.delete({userId:req.body.userId});
        }
        if(myorderObj!=null){
            await myOrdersCollectionObj.delete({userId:req.body.userId});
        }
        res.send({message:true});
    }
}))
//export
module.exports = userApiObj;