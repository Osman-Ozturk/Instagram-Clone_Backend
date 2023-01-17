import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()
const JWT_KEY =process.env.JWT || "mein_geheimnisePassword";
const auth = (req, res, next) => {
        try {
          console.log(req.cookies);
          const token = req.cookies.loginCookie;
          console.log("token",token);
          const decodedToken = jwt.verify(token, process.env.JWT);

          req.token = decodedToken;

          

          next()
        } catch (error) {
          const errObj = new Error("Not authorized", { cause: error });
          errObj.statusCode = 401;
          next(errObj);
        }
      };
      export default auth;