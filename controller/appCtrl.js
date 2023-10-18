const { App, Category, Banner, Recipes } = require("../models");
const path = require("path");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");

const createApp = async (req, res) => {
  try {
    //   console.log(`name=${req.body.name}`);
    let app = await App.findOne({
      where: {
        packageName: req.body.packageName,
      },
    });

    if (!app) {
      const uploadedFileName = req.file.filename;
      console.log(uploadedFileName);
      const imagePath = path.join("/images/appImage/", uploadedFileName);
      app = await App.create({
        name: req.body.name,
        image: imagePath,
        packageName: req.body.packageName,
        description: req.body.description,
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "app exist" });
    }
    return res.status(httpStatus.OK).json(app);
  } catch (error) {
    // console.error("Error creating app:", error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const getaApp = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const app = await App.findByPk(appId);
    if (!app) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "app not found" });
    }
    res.status(httpStatus.OK).json(app);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getallApp = asyncHandler(async (req, res) => {
  try {
    const app = await App.findAll();
    res.status(httpStatus.OK).json(app);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while fetching " });
  }
});
const getAppHomeData = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const app = await App.findByPk(appId, {
      include: [
        { model: Category, include: [{ model: Recipes, limit: 10 }] },
        { model: Banner },
      ],
    });
    res.status(httpStatus.OK).json(app);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while fetching " });
  }
});

const updateApp = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const app = await App.findByPk(appId);
    if (!app) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "app not found" });
    }
    const uploadedFileName = req.file.filename;
    console.log(uploadedFileName);
    const imagePath = path.join("/images/", uploadedFileName);
    await app.update({
      name: req.body.name,
      image: imagePath,
      packageName: req.body.packageName,
      description: req.body.description,
    });
    await app.save();

    res.status(httpStatus.OK).json(app);
  } catch (error) {
    console.error(error);

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const deleteApp = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const app = await App.findByPk(appId);
    if (!app) {
      return res.status(404).json({ error: "app not found" });
    }
    await app.destroy();
    res.status(httpStatus.OK).json("app deleted Successfully");
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

module.exports = {
  createApp,
  getaApp,
  getallApp,
  deleteApp,
  updateApp,
  getAppHomeData,
};
