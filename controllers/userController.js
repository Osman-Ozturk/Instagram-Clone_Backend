import User from "../models/User.js";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail"
import jwt from "jsonwebtoken";

const JWT_KEY =process.env.JWT || "mein_geheimnisePassword";


const updateUser = async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        next(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Konto wurde aktualisiert");
    } catch (error) {
      next(error)
    }
  }
};

const deleteUser = async (req, res,next) => {
  if ((req.body.userId = req.params.id || req.body.isAdmin)) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Konto wurde gelöscht");
    } catch (error) {
      next(error)
    }
  }
};
const getUser = async (req, res,next) => {
  const userName = req.params.userName;
  console.log("userName",userName);
  try {
    const user = await User.findOne({ userName: userName });
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

const addUser = async (req, res,next) => {
  try {
  const newUser =req.body 
  const existedUser = await User.findOne({ email: newUser.email });
    if (existedUser) {
      const error = new Error(
        "Es gibt bereits einen User mit der e-Mail-Adresse."
      );
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await User.create({
      ...newUser,
      password: hashedPassword,
    });
  
  
// mit sendGrid email verifizieren

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const token = jwt.sign(
  {
    email: newUser.email,
    _id: createdUser._id,
  },
  JWT_KEY,
  {
    expiresIn: "1h",
  }
);

const msg = {
  to: newUser.email,
  from: "osman_0940@outlook.com",
  subject: "Email Verification",
  text: `Zur Verifizierung der email bitte auf diese Adresse gehen: http://localhost:4000/verify/${token}`,
  html: `<p><a href="http://localhost:4000/verify/${token}">Verifiziere deine email!</a></p>`,
};
const response = await sgMail.send(msg);
const {fullName,userName,email,password,bio,profilePicture, isVerified}=newUser
res.status(201).json({fullName,userName,email,password,bio,profilePicture, isVerified,token})
} catch (error) {
next(error);
}
};
const verifyEmail = async (req, res,next) => {
try {
const token = req.params.token;
const decodedToken = jwt.verify(token, JWT_KEY);
const id = decodedToken._id;
const user = await User.findByIdAndUpdate(id, { isVerified: true });

res.send({ message: "email verifiziert" });
} catch (error) {
next(error)
}
};

const loginUser = async (req, res, next) => {
  try {
    const user = req.body;
    const existedUser = await User.findOne({ email: user.email });
    if(!existedUser.isVerified) {
      const err = new Error("Benutzer ist noch nicht verifiziert, bitte verifizieren Sie sich über den Link in Ihrer E-Mail. Wenn der Link älter als eine Stunde ist, fordern Sie bitte einen neuen an.");
      err.statusCode = 401;
      throw err;
    }

    if (!existedUser) {
      const error = newError(`Kein User mit der eMail ${user.email}`);
      error.statusCode = 401;
      throw error;
    }
    const vergleichRichtigesPasswort = await bcrypt.compare(
      req.body.password,
      existedUser.password
    );
    if (!vergleichRichtigesPasswort) {
      const error = new Error(`Invalid Password`);
      error.statusCode = 401;
      throw error;
    } 
    const token = jwt.sign({email:existedUser.email,id:existedUser._id}, process.env.JWT,{expiresIn:"1h"})
     // COOKIE CODE //
     const oneHour = 1000 * 60 * 60;
     res
       .cookie("loginCookie", token, {
         maxAge: oneHour,
         httpOnly: true,
         sameSite: 'none',
         //secure: true,
       })
       .json({
         auth: "loggedin",
         email: existedUser.email,
         id: existedUser._id,
         message: "Login SUCCESSFUL!",
         token:token
       });
     // END COOKIE CODE //
     //res.send({ message: "login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Einloggen fehlgeschlagen" });
    next(error);
  }
};


// follow a user

const followUser = async (req, res,next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(201).json("Benutzer wurde verfolgt");
      } else {
        res.status(403).send("Sie folgen diesem Benutzer bereits!");
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(403).send("Du kannst dir selbst nicht folgen");
  }
};
const unfollowUser = async (req,res)=>{
  if (req.body.userId !== req.params.id) {
          try {
                 const user =await User.findById(req.params.id);
                 const currentUser = await User.findById(req.body.userId)
                 if (user.followers.includes(req.body.userId)) {
                  await user.updateOne({$pull : {followers:req.body.userId}})
                  await currentUser.updateOne({$pull : {followings:req.params.id}})
                  res.status(201).json("Dem Benutzer wurde nicht mehr gefolgt");
                 } else{
                  res.status(403).send("Sie entfolgen diesem Benutzer nicht!!");
                 }
          } catch (error) {
                res.status(500).send(error)  
          }
  }else{
          res.status(403).send("Du kannst dich selbst nicht entfolgen");
  }
}


export { updateUser, deleteUser, getUser, getAllUsers ,addUser,verifyEmail,loginUser,followUser,unfollowUser};