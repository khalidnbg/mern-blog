import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "Signup Success" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields required"));
  }

  try {
    const valideUser = await User.findOne({ email });

    if (!valideUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validePassword = bcryptjs.compareSync(password, valideUser.password);

    if (!validePassword) {
      return next(errorHandler(404, "Password incorrect"));
    }

    const token = jwt.sign({ id: valideUser._id }, process.env.JWT_SECRET);

    // do not send the password back
    const { password: pass, ...rest } = valideUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
