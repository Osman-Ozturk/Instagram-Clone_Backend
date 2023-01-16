const auth = (req, res, next) => {
        try {
          const token = req.cookie.loginCookie;
          const decodedToken = jwt.verify(token, process.env.JWT || "standartWert");
          req.token = decodedToken;
          next();
        } catch (error) {
          const errObj = new Error("Not authorized", { cause: error });
          errObj.statusCode = 401;
          next(errObj);
        }
      };
      export default auth;