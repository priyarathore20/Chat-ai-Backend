import { Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = createToken(user?._id, user?.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      expires,
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: "OK", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    res.clearCookie("auth_token", {
      domain: "localhost",
      httpOnly: true,
      path: "/",
      signed: true,
    });

    const token = createToken(user?._id, user?.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      expires,
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
