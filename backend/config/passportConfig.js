const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../prisma/queries");

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["token"];
    }
    return token;
};

var opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
    ]),
    secretOrKey: process.env.JWT_SECRET,
};

function configurePassport(passport) {
    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            try {
                const user = await db.getUserById(jwt_payload.id);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        })
    );
}

module.exports = configurePassport;
