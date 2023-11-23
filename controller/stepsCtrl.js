const{Steps}=require("../models");
const asyncHandler = require("express-async-handler");
const pick = require("../utils/pick");
const httpStatus = require("http-status");
const { Op } = require("sequelize");


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
 
  const getAllByFilter = asyncHandler(async (req, res) => {
    const filter = pick(req.query, ["name",  "RecipeID",]);
    const options = pick(req.query, ["sortBy", "limit", "page", "count"]);
  
    try {
      const propertyFilters = {};
  
      // Iterate over the property names and add filters if they exist in 'filter'
      const propertyNamesToFilter = ["name"];
      propertyNamesToFilter.forEach((propertyName) => {
        if (filter[propertyName]) {
          propertyFilters[propertyName] = {
            [Op.iLike]: `%${filter[propertyName]}%`,
          };
        }
      });
  
     
      if (filter.RecipeID) {
        propertyFilters.RecipeID = {
          [Op.eq]: filter.RecipeID,
        };
      }
  
  
      options.page = options.page ? parseInt(options.page) : 1;
      options.limit = options.limit ? parseInt(options.limit) : 10;
  
      //const recipes =
      await Steps.findAll({
        where: propertyFilters,
        //include: [{ model: Ingredients,order:[['createdAt','DESC']] }, { model: Steps }],
        order: options.sortBy
          ? options.sortBy == "createdAt"
            ? [[options.sortBy, "DESC"]]
            : [[options.sortBy, "ASC"]]
          : undefined,
        limit: parseInt(options.limit),
        offset: options.page
          ? (parseInt(options.page) - 1) * parseInt(options.limit)
          : undefined,
      })
        .then(async (recipes) => {
          const totalCount = await Steps.count({ where: propertyFilters });
          const totalPages = Math.ceil(totalCount / options.limit);
          const hasNext = options.page < totalPages;
          return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "success",
            data: recipes,
            page: options.page,
            limit: options.limit,
            totalPages: totalPages,
            totalCount: totalCount,
            hasNext: hasNext,
          });
        })
        .catch((error) => {
          return res
            .status(httpStatus.BAD_REQUEST)
            .send({ error: error.message });
        });
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }
  });

  module.exports={createSteps,getaSteps,getallStep,deleteSteps,updateSteps,getAllByFilter};