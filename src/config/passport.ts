/* eslint-disable prettier/prettier */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import UserService from '../services/user.service';
import userModel from '../models/user.model';
class PassPort {
    private CLIENTID;
    private CLIENTSECRET;
    constructor () {
    this.CLIENTID = process.env.CLIENTID;
    this.CLIENTSECRET = process.env.CLIENTSECRET;
    }

    public initializePassport = (): void => {
        passport.use( new GoogleStrategy({
            clientID: this.CLIENTID,
            clientSecret: this.CLIENTSECRET,
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
            passReqToCallback: true,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const data = await userModel.findOrCreate({googleId: profile.id}, function (err, user) {
                return cb(err, user);
            })  
        }
        ));
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((user,done) => {
            done(null, user);
        })
    }
}
export default PassPort;
