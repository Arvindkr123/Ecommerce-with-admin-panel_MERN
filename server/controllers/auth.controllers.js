import Joi from "joi";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.models.js";
import { generateWebToken } from "./../utils/generateToken.utils.js";

export const registerController = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const existedUser = await UserModel.findOne({ email: req.body.email });

    if (existedUser) {
      return res.status(400).json("User is already exists");
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );

    let newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = await generateWebToken(newUser);

    return res.status(200).json({ newUser, token });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginContoller = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).send("Invalid email or password");
    }

    const token = await generateWebToken(user);
    return res.status(200).json({
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
