const{Steps}=require("../models");
const asyncHandler = require("express-async-handler");


const createSteps = asyncHandler(async (req, res) => {
  try {
    const { description, RecipeID } = req.body;
    const steps = await Steps.create({ description, RecipeID });
    res.status(201).json(steps);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


  const getaSteps = asyncHandler(async (req, res) => {
    try {
      const stpId = req.params.id;
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(404).json({ error: 'steps not found' });
      }
      res.status(200).json(steps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the steps' });
    }
  });

  const getallStep = asyncHandler(async (req, res) => {
    try {
      const steps = await Steps.findAll();
      res.status(200).json(steps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching ' });
    }
  });
  

  const deleteSteps = asyncHandler(async (req, res) => {
    try {
      const  stpId= req.params.id
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(404).json({ error: 'steps not found' });
      }
      await steps.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the steps' });
    }
  });


  const updateSteps = asyncHandler(async (req, res) => {
    try {
      const stpId = req.params.id;
      const steps = await Steps.findByPk(stpId);
      if (!steps) {
        return res.status(404).json({ error: 'steps not found' });
      }
      
      await steps.update(req.body);
  
      res.status(200).json(steps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the steps' });
    }
  });
 
  module.exports={createSteps,getaSteps,getallStep,deleteSteps,updateSteps};