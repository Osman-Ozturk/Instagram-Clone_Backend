import User from "../models/User.js";
import bcrypt from "bcrypt";
const updateUser = async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        next()
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      next(error)
    }
  }
};

const deleteUser = async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      next(error)
    }
  }
};
const getUser = async (req, res,next) => {
  const username = req.params.name;
  try {
    const user = await User.findOne({ userName: username });
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }
};

const getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    next(error)
  }
};



export { updateUser, deleteUser, getUser, getAllUsers };