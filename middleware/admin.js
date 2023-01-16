import User from "../models/User.js";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.token.id);
    if (!user.isAdmin) {
      const err = new Error("Keine Administratorrechte!");
      err.statusCode = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default admin;