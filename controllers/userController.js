import userSchema from "../validationSchemas/userSchema";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

import models from "../models";

const createUser = async (req, res, next) => {
  const userData = req.body;
  const validationResult = userSchema.validate(userData);

  if (validationResult.error) {
    return res
      .status(412)
      .json({ err: validationResult.error.details[0].message });
  }

  try {
    fs.access("./data/profilePhotos", (err) => {
      if (err) {
        fs.mkdirSync("./data/profilePhotos");
      }
    });

    await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .toFile("./data/profilePhotos/" + req.file.originalname);

    const user = models.User.build({
      ...userData,
      photo: req.file.originalname,
    });

    await user.save();

    return res.status(201).json({ id: user.dataValues.id });
  } catch (err) {
    console.log(err);
    res.send(400).json({ error: err });
  }
};

const getUser = async (req, res, next) => {
  try {
    const userData = await models.User.findOne({
      where: { id: req.params.id },
    });

    if (!userData) return res.status(404).send("Such data not found.");

    console.log("photo ", userData.dataValues);
    const photo = fs.readFileSync(
      "./data/profilePhotos/" + userData.dataValues.photo,
      "base64"
    );
    res.json({ ...userData.dataValues, photo });
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: err });
  }
};

export { createUser, getUser };
