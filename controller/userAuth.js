const{Ruser}=require("../models");

const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const JWT_SECRET = process.env.JWT_SECRET;

const createUser = asyncHandler(async (req, res) => {
    const {name,email,contact,username,password,type,isactive} = req.body;
      const existinguser=await  Ruser.findOne({ where: { username } });
      if(existinguser){
        return res.status(httpStatus.BAD_REQUEST).send("Username already exists");
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      const ruser = await Ruser.create({ name,email,contact,username,password:hashedPassword,type,isactive });
      res.status(httpStatus.OK).send(`User ${ruser.username} created successfully.`);
    });


    const loginUser = asyncHandler(async (req, res) => {
      const { username, password } = req.body;
        const user = await Ruser.findOne({ where: { username } });
    
        if (!user) {
          return res.status(httpStatus.BAD_REQUEST).send("Incorrect username");
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(httpStatus.BAD_REQUEST).send("Incorrect password");
        }
    
        const token = jwt.sign({ userId: user.ruserid },JWT_SECRET, {
          expiresIn: '1d',
        });
    
        res.status(200).json({name:user.name,email:user.email,contact:user.contact,username:user.username,token:token});
    });
  

  const getAllUser = asyncHandler(async (req, res) => {
    try {
      const users = await Ruser.findAll({
        where: {
          type: 'user',
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send("An error occurred while fetching users");
    }
  });

  const getaUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Ruser.findByPk(userId);
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).send("User not found");   
              } 
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send("An error occurred while fetching the user");   
  }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
      const  userId= req.params.id
      const user = await Ruser.findByPk(userId);
      if (!user) {
        return res.status(httpStatus.BAD_REQUEST).send("User not found"); 
      }
      await user.destroy();
      return res.status(httpStatus.OK).send("Deleted successfully"); 
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send("An error occurred while deleting the user"); 
    }
  });

  const updateUserDetails = asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Ruser.findByPk(userId);
      if (!user) {
        return res.status(httpStatus.BAD_REQUEST).send("User not found"); 
      }
      
      await user.update(req.body);
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send("An error occurred while updating the user"); 
      
    }
  });

  
  const updatePassword = asyncHandler(async (req, res) => {
    console.log(`user=${req.user}`);
    const { ruserid } = req.user;
    const { password } = req.body;
    console.log(ruserid);
      const user = await Ruser.findOne({where:{ruserid:ruserid}});
      if (!user) {
        return res.status(httpStatus.BAD_REQUEST).send("User not found"); 
      }
  
      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
  
        await user.save();
  
        return res.status(httpStatus.OK).send("Password updated successfully"); 
      }
      return res.status(httpStatus.BAD_REQUEST).send("An error occurred while update the password"); 
    
  });

  const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      const  admin = await Ruser.findOne({ where: { username } });
  
      if (!admin) {
        return res.status(httpStatus.BAD_REQUEST).send("username is not correct");
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(httpStatus.BAD_REQUEST).send("Wrong password");
      }
  
      const token = jwt.sign({ userId: admin.ruserid },JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(200).json({name:admin.name,email:admin.email,contact:admin.contact,username:admin.username,token:token});
    //res.status(200).json({admin,token});
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send("An error occurred while logging in");
    }
  });


  const changeDefaultvalue= asyncHandler( async (req, res) => {
  try {
    const  userId = req.params.id;
    console.log(userId);
    const user = await Ruser.findByPk(userId);
        if (!user) {
      // console.log(error);
      return res.status(httpStatus.BAD_REQUEST).send("User not found"); 
    }

    // Update the 'isactive' field from 'true' to 'false'
    user.isactive = false;
    await user.save();

    res.status(200).json({ message: 'Default value changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while changing the default value' });
  }
});
    

  module.exports = {createUser,loginUser,getAllUser,getaUser,deleteUser,updateUserDetails,
    updatePassword,loginAdmin,changeDefaultvalue};
