const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../prisma/queries");

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

function configurePassport(passport) {
    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            const user = await db.getUserById(jwt_payload.sub);
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    );
}

module.exports = configurePassport;
