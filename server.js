const exp=require("express")
const app=exp();

const mc=require("mongodb").MongoClient;
const mongoose=require("mongoose")

//import .env file
require("dotenv").config();

const path=require("path")
//connect angular with web server
app.use(exp.static(path.join(__dirname,"dist/BookStore")));


//import api objs
const userApi=require("./APIS/user-Api")
const adminApi=require("./APIS/admin-Api")
const cartApi=require("./APIS/usercart-Api")
const wishlistApi=require("./APIS/wishlist-Api")
const myorderApi=require("./APIS/myorders-Api")

//forward req obj to specified API based on path
app.use("/user",userApi)
app.use("/admin",adminApi)
app.use("/cart",cartApi)
app.use("/wishlist",wishlistApi)
app.use("/myorders",myorderApi)

//connect dburl
const dburl=process.env.dburl;
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database object
    const databaseObj=client.db("BookStore");
    const booksCollectionObj=databaseObj.collection("books collection")
    const userCollectionObj=databaseObj.collection("users collection");
    const myOrdersCollectionObj=databaseObj.collection("my orders collection")
    const cartCollectionObj=databaseObj.collection("usercart")
    const wishlistCollectionObj=databaseObj.collection("wishlistcollection")

    //sharing collection object
    app.set("booksCollectionObj",booksCollectionObj)
    app.set("userCollectionObj",userCollectionObj)
    app.set("myOrdersCollectionObj",myOrdersCollectionObj)
    app.set("cartCollectionObj",cartCollectionObj)
    app.set("wishlistCollectionObj",wishlistCollectionObj)
    console.log("DB Server Started")
})
.catch(err=>console.log("err in db connection",err))



//middleware to handle invalid paths
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",reason:err.message})
})

//assign port number
const port=process.env.PORT||8080;
app.listen(port,()=>console.log(`Web server is on ${port}`))