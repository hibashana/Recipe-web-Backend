const{Ruser}=require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");


const JWT_SECRET = process.env.JWT_SECRET;


// function authenticateToken(req, res, next) {
//     const tokenb = req.header("Authorization");
//     const token = tokenb.split(" ")[1];
//     console.log(token);
//     if (!token) return res.status(401).json({ error: "Access denied" });
  
//     jwt.verify(token, "JWT_SECRET", (err, user) => {
//       if (err) return res.status(403).json({ error: "Token is not valid" });
//       req.user = user;
//       next();
//     });
//   }

//create user
const createUser = asyncHandler(async (req, res) => {
    const {name,email,contact,username,password,type} = req.body;

    try {
      const existinguser=await  Ruser.findOne({ where: { email } });
      if(existinguser){
        return res.status(400).json({message:"User already exists"});
        }

      const hashedPassword = await bcrypt.hash(password, 10);
      const ruser = await Ruser.create({ name,email,contact,username,password:hashedPassword,type });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  });


  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Ruser.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const token = jwt.sign({ userId: user.ruserid },JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(200).json({name:user.name,email:user.email,contact:user.contact,username:user.username,token:token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });

  const getAllUser = asyncHandler(async (req, res) => {
    try {
      const users = await Ruser.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  });

  const getaUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Ruser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
      const  userId= req.params.id
      const user = await Ruser.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  });

  const updateUserDetails = asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Ruser.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      await user.update(req.body);
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  });

  
  const updatePassword = asyncHandler(async (req, res) => {
    console.log(`user=${req.user}`);
    const { ruserid } = req.user;
    const { password } = req.body;
    console.log(ruserid);
   try {
      const user = await Ruser.findOne({where:{ruserid:ruserid}});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
  
        await user.save();
  
        res.status(200).json({ message: 'Password updated successfully' });
      } else {
        res.status(400).json({ error: 'New password is required' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  const getalladmindetails= asyncHandler( async (req, res) => {
    try {
      const admins = await Ruser.findAll({
        where: {
          type: 'admin',
        },
      });
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching admin details' });
    }
  });
  
  

  module.exports = {createUser,loginUser,getAllUser,getaUser,deleteUser,updateUserDetails,
    updatePassword,getalladmindetails};
