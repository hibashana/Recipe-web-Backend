
const multer = require("multer");
const path = require("path");

//specify the storage


const storageApp = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null,"./public/images/appImage");
    },
    filename:(req,file,cb)=>{
      console.log(file);
      cb(null,Date.now()+req.body.name+path.extname(file.originalname));
    },
  });
  const storageBanner = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null,"./public/images/banner");
    },
    filename:(res,file,cb)=>{
      console.log(file);
      cb(null,Date.now()+path.extname(file.originalname));
    },
  });
  const storageRecipes = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null,"./public/images/recipes");
    },
    filename:(res,file,cb)=>{
      console.log(file);
      cb(null,Date.now()+path.extname(file.originalname));
    },
  });

const uploadApp = multer({storage: storageApp, });
const uploadBanner = multer({storage: storageBanner, });
const uploadRecipes = multer({storage: storageRecipes, });


module.exports = { uploadApp,uploadBanner,uploadRecipes }
