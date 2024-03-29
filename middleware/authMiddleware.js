const {  Users } = require("../models");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization.split(" ")[1];
    
    try {
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        //console.log(`decide=${decoded.userId}`);
        const id = decoded?.id;
        const user = await Users.findByPk(id);
        //console.log(`user1=${user}`);
        if(user){
          req.user = user;
          next();
          console.log(decoded);
        }else{
          throw new Error("user not found");
        }
        
      }
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized token expired, please login again $");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});


const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await Users.findOne({ where: { email: email } });
  if (adminUser.type !== "admin") {
    throw new Error("You are not admin");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin };
