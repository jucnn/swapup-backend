/* 
Imports
*/

const JwtStrategy = require("passport-jwt").Strategy;
const UserModel = require("../models/user.model");

/* 
Methods
*/

const cookieExtractor = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[process.env.COOKIE_NAME];
  }
  return token;
};

// JWT authentification
const authJwt = (passport) => {
  // JWT options for passport
  const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  // JWT Strategy
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

/* 
Export
*/

module.exports = {
  setAuthentification: (passport) => {
    authJwt(passport);
  },
};
