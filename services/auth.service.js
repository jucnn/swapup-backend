/* 
Imports
*/
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require("../models/user.model");
//

/* 
Methods
*/
// Extract token from cookie
/* const cookieExtractor = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[process.env.COOKIE_NAME];
  }
  return token;
};
 */
// JWT authentication
const authJwt = (passport) => {
  // JWT options for passport
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // JWT strategy
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
        // TODO: check user password
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
//

/* 
Export
*/
module.exports = {
  setAuthentification: (passport) => {
    authJwt(passport);
  },
};
//
