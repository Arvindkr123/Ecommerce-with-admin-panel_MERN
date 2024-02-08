import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const generateWebToken = async (user) => {
//   console.log(user);
  const token = await jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET
  );
//   console.log(token);

  return token;
};
