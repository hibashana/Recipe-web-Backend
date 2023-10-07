const{Steps}=require("../models");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");


const createSteps = asyncHandler(async (req, res) => {
  try {
    const { description, RecipeID } = req.body;
    const steps = await Steps.create({ description, RecipeID });
    res.status(httpStatus.OK).json(steps);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});


  const getaSteps = asyncHandler(async (req, res) => {
    try {
      const stpId = req.params.id;
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'steps not found' });
      }
      res.status(httpStatus.OK).json(steps);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
      // res.status(500).json({ error: 'An error occurred while fetching the steps' });
    }
  });

  const getallStep = asyncHandler(async (req, res) => {
    try {
      const steps = await Steps.findAll();
      res.status(httpStatus.OK).json(steps);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.BAD_REQUEST).json({ error: 'An error occurred while fetching ' });
    }
  });
  

  const deleteSteps = asyncHandler(async (req, res) => {
    try {
      const  stpId= req.params.id
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'steps not found' });
      }
      await steps.destroy();
      res.status(httpStatus.OK).json('Steps deleted');
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  });


  const updateSteps = asyncHandler(async (req, res) => {
    try {
      const stpId = req.params.id;
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'steps not found' });
      }
      
      await steps.update(req.body);
  
      res.status(httpStatus.OK).json(steps);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  });
 
  module.exports={createSteps,getaSteps,getallStep,deleteSteps,updateSteps};