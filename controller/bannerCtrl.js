const{Banner}=require("../models");
const path=require("path");
const asyncHandler = require("express-async-handler");

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
        const imagePath = path.join("public/images/", uploadedFileName);
        banner = await Banner.create({
          name: req.body.name,
          image: imagePath,
        });
      } else {
        return res.status(200).json({ message: "Banner exist" });
      }
      return res.status(200).json(banner);
    } catch (error) {
      console.error("Error creating banner:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  const getaBanner = asyncHandler(async (req, res) => {
    try {
      const bannerId = req.params.id;
      const banner = await Banner.findByPk(bannerId);
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      res.status(200).json(banner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the banner' });
    }
  });
  

  const getallBanner = asyncHandler(async (req, res) => {
    try {
      const banner = await Banner.findAll();
      res.status(200).json(banner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching ' });
    }
  });

  const updateBanner= asyncHandler(async (req, res) => {
    try {
      const bannerId = req.params.id;
      const banner= await Banner.findByPk(bannerId);
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      const uploadedFileName = req.file.filename;
      console.log(uploadedFileName);
      const imagePath = path.join("public/images/", uploadedFileName);
     await banner.update({
        name: req.body.name,
        image: imagePath,
      });
      await banner.save();

      res.status(200).json(banner);
    } catch (error) {
      console.log(error);

      console.error(error);
     
      res.status(500).json({ error: 'An error occurred while updating the banner' });
    }
  });

  const deleteBanner = asyncHandler(async (req, res) => {
    try {
      const  bannerId= req.params.id
      const banner = await Banner.findByPk(bannerId);
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      await banner.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the banner' });
    }
  });

  module.exports={createBanner,getaBanner,getallBanner,deleteBanner,updateBanner};