
const asyncHandler = require("express-async-handler");
const{Ruser}=require("../models");
const jwt = require("jsonwebtoken");


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers.authorization);
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req?.headers?.authorization.split(" ")[1];
      console.log(token);
      try {
        if (token) {
          const decoded = jwt.verify(token, "secret");
          console.log(`decide=${decoded?.userId}`);
          const id=decoded?.userId;
          const user = await Ruser.findByPk(id);
          console.log(`user1=${user}`);
          req.user = user;
          next();
          console.log(decoded);
        }
      } catch (error) {
        console.log(error);
        throw new Error("Not authorized token expired, please login again $"); // Use 'new Error' here
      }
    } else {
      throw new Error("There is no token attached to the header"); // Use 'new Error' here
    }
  });
  

  const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await Ruser.findOne({ email });
    if (adminUser.role !== "admin") {
      throw new error("You are not admin");
    }else{
      next();
    }
  });

  module.exports={authMiddleware,isAdmin};