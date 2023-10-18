const { Banner } = require("../models");
const path = require("path");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");

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
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while fetching " });
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
    const uploadedFileName = req.file.filename;
    console.log(uploadedFileName);
    const imagePath = path.join("public/images/", uploadedFileName);
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
    });
    res.status(httpStatus.OK).json(banner);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while fetching " });
  }
});
module.exports = {
  createBanner,
  getaBanner,
  getallBanner,
  deleteBanner,
  updateBanner,
  getAllByApp,
};
