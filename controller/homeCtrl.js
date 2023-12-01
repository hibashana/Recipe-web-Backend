const asyncHandler = require("express-async-handler");
const { Category, Banner, Recipes } = require("../models");
const httpStatus = require("http-status");

const getTotalCount = asyncHandler(async (req, res) => {
  try {
    const appId = req.query.appId;
    const whereCondition={
        appID:appId
    }
    const [recipeCount, categoryCount, bannerCount] = await Promise.all([
      Recipes.count({where:whereCondition}),
      Category.count({where:whereCondition}),
      Banner.count({where:whereCondition}),
    ]);
    return res
      .status(httpStatus.OK)
      .json({ recipeCount, categoryCount, bannerCount });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

module.exports = { getTotalCount };
