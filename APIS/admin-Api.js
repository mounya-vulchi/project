const exp=require("express")
const adminApiObj=exp.Router()


//enable body parser middleware
adminApiObj.use(exp.json())

const asyncHandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken");


//import cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer=require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name: 'diqtn7ozg',
    api_key: '512249956943975',
    api_secret: 'k2WkjpyCn8toi2WNROdsbNoA3U8'
});


//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'BookStore',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });

//create a newbook
adminApiObj.post("/addnewbook",upload.single('photo'),asyncHandler(async(req,res,next)=>{
    //console.log("hi ",req.body)
    let NewBook=req.app.get("booksCollectionObj")

    let bookObj=JSON.parse(req.body.bookObj)
    //console.log("the book details are ",bookObj)

    let book=await NewBook.findOne({booktitle:bookObj.booktitle})

    //if book is existed
    if(book!=null){
        res.send({message:"Book already Existed"})
    }
    else{
        //add bookImagelink
        bookObj.bookImgLink = req.file.path;

        //create product
        let success=await NewBook.insertOne(bookObj);
        //console.log("the img link is ",bookObj)
        res.send({message:"New Book Added"})
    }
}))


//get all books
adminApiObj.get("/getallbooks",asyncHandler(async(req,res,next)=>{
    let Book=req.app.get("booksCollectionObj")

    let AllBooks= await Book.find().toArray();
    res.send({booksarray:AllBooks})
}))

//get book details
adminApiObj.get("/bookdetails/:book",asyncHandler(async(req,res,next)=>{
    let Books=req.app.get("booksCollectionObj")
    
    let BookDetails=await Books.findOne({booktitle:req.params.book})
    if(BookDetails!==null){
        res.send({Details:BookDetails})
    }
    else{
        res.send({message:"Book not found"})
    }
}))

//update book details
adminApiObj.put("/updatebook",asyncHandler(async(req,res,next)=>{
    //console.log(req.body)
    let AllBooks=req.app.get("booksCollectionObj")
    let BookDetails=await AllBooks.findOne({booktitle:req.body.booktitle})
    if(BookDetails!==null){
        let edit=await AllBooks.updateOne({booktitle:req.body.booktitle},{$set:{
            author:req.body.author,
            price:req.body.price,
            publisher:req.body.publisher,
            publicationdate:req.body.publicationdate,
            paperback:req.body.paperback,
            rating:req.body.rating,
            category:req.body.category,
            description:req.body.description
        }});
        res.send({message:true});
    }
    else{
        res.send({message:"Book not found"})
    }
}))

//delete the book
adminApiObj.post("/deletebook",asyncHandler(async(req,res,next)=>{
    //console.log(req.body)
    let AllBooks=req.app.get("booksCollectionObj")
    let BookDetails=await AllBooks.findOne({booktitle:req.body.booktitle})

    //if username alreaddy taken
    if(BookDetails!==null){
        let remove=await AllBooks.deleteOne({booktitle:req.body.booktitle});
        res.send({message:true});
    }

}))

//get category wise books
adminApiObj.get("/categorybooks/:cat",asyncHandler(async(req,res,next)=>{
    let Books=req.app.get("booksCollectionObj")
    
    let BookDetails=await Books.find({category:req.params.cat})
    if(BookDetails!==null){
        res.send({Details:BookDetails})
    }
    else{
        res.send({message:"Book not found"})
    }
}))

//export
module.exports= adminApiObj;