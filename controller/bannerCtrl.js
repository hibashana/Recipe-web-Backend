const { Banner, BannerRecipe, Recipes,Ingredients,Steps } = require("../models");
const path = require("path");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const { Op } = require("sequelize");

const createBanner = async (req, res) => {
  try {
    //   console.log(`name=${req.body.name}`);
    let banner = await Banner.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!banner) {
      const uploadedFileName = req.file.filename;
      console.log(uploadedFileName);
      const imagePath = path.join("/images/banner/", uploadedFileName);
      banner = await Banner.create({
        name: req.body.name,
        image: imagePath,
        appID: req.body.appID,
      });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Banner exist" });
    }
    return res.status(httpStatus.OK).json(banner);
  } catch (error) {
    // console.error("Error creating banner:", error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const getaBanner = asyncHandler(async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Banner not found" });
    }
    res.status(httpStatus.OK).json(banner);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getallBanner = asyncHandler(async (req, res) => {
  try {
    const banner = await Banner.findAll();
    res.status(httpStatus.OK).json(banner);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
});

const updateBanner = asyncHandler(async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Banner not found" });
    }
    const uploadedFileName =req.file? req.file.filename:banner.image;
    console.log(uploadedFileName);
    const imagePath =req.file? path.join("/images/banner/", uploadedFileName):banner.image;
    await banner.update({
      name: req.body.name,
      image: imagePath,
      appID: req.body.appID,
    });
    await banner.save();

    res.status(httpStatus.OK).json(banner);
  } catch (error) {
    console.error(error);

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    await banner.destroy();
    res.status(httpStatus.OK).json("Banner deleted Successfully");
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

// For mobile App
const getAllByApp = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const banner = await Banner.findAll({
      where: {
        appID: appId,
      },

      include: [
        {
          model: Recipes,
          as: "Recipes",
          through: { attributes: [] },
        },
      ],
    })
      .then((banner) => {
        res.status(httpStatus.OK).json(banner);
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
      });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
});
const getAllByFilter = asyncHandler(async (req, res) => {
  const filter = pick(req.query, ["name", "appID"]);
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

    if (filter.appID) {
      propertyFilters.appID = {
        [Op.eq]: filter.appID,
      };
    }

    options.page = options.page ? parseInt(options.page) : 1;
    options.limit = options.limit ? parseInt(options.limit) : 10;

    //const recipes =
    await Banner.findAll({
      where: propertyFilters,
      // include: [
      //   {
      //     model: Recipes,
      //     limit: 10,
      //     include: [{ model: Ingredients }, { model: Steps }],
      //   },
      // ],
      include: [{
        model: Recipes,
        through: {
          model: BannerRecipe,
        },
        include: [{ model: Ingredients }, { model: Steps }],
        as: 'Recipes',
      }],
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
        const totalCount = await Banner.count({ where: propertyFilters });
        const totalPages = Math.ceil(totalCount / options.limit);
        const hasNext = options.page < totalPages;
        return res.status(httpStatus.OK).json({
          status: httpStatus.OK,
          message: httpStatus["200_NAME"],
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

// For recipes By banner
const createBannerRecipe = asyncHandler(async (req, res) => {
  const bannerId = req.body.bannerId;
  const recipeId = req.body.recipeId;

  // Create a new record in the BannerRecipes model to associate a banner with a recipe
  await BannerRecipe.create({
    bannerId: bannerId,
    recipeId: recipeId,
  })
    .then((bannerRecipe) => {
      return res.status(httpStatus.OK).json(bannerRecipe);
      //console.log("Banner-Recipe association created:", bannerRecipe);
    })
    .catch((error) => {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.message });

      // console.error("Error creating Banner-Recipe association:", error);
    });
});
const deleteBannerRecipe = asyncHandler(async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await BannerRecipe.findByPk(bannerId);
    if (!banner) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Banner not found" });
    }
    await banner.destroy();
    res.status(httpStatus.OK).json({ message: "deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});
module.exports = {
  createBanner,
  getaBanner,
  getallBanner,
  deleteBanner,
  updateBanner,
  getAllByApp,
  getAllByFilter,
  createBannerRecipe,
  deleteBannerRecipe
};
