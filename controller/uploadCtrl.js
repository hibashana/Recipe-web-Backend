
const multer = require("multer");
const path = require("path");
// const {Category} = require('../models');
// const asyncHandler = require('express-async-handler');


//specify the storage


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null,"./public/images");
    },
    filename:(res,file,cb)=>{
      console.log(file);
      cb(null,Date.now()+path.extname(file.originalname));
    },
  });
  // const uploadimg = asyncHandler(async (req, res,next) => {
  //     try {
  //       const path = require("path")
  //       const uploadedFileName = req.file.filename;
  //               console.log(uploadedFileName);
  //               const imagePath = path.join( 'public/images/', uploadedFileName);
       // const { originalname, buffer } = req.file;
   // console.log(originalname);
        // Save the image to the database
        
    //     await Category.create({
    //       name: req.body.name,
    //       image: imagePath,
    //       no_of_recipes:req.body.no_of_recipes
    //     });
    
    //     res.status(201).json({ message: 'Image uploaded successfully' });
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //     res.status(500).json({ error: 'An error occurred while uploading the image' });
    //   }
    //   next();
    // });


  

//file validation

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };

// const uploadPhoto = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   // limits: { fileSize: 1000000 },
// });

const upload = multer({storage: storage, });


module.exports = { upload }
