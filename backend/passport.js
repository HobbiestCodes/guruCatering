// import passport from "passport";
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { userModel } from "./mongo/schema.js";
// import dotenv from 'dotenv';

// dotenv.config();
// passport.serializeUser((user, done) => {
//     console.log('Serializing user:', user);
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await userModel.findById(id);
//   done(null, user);
// });

// passport.use(
//     new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:8080/auth/google/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         const user = await userModel.findOne({ googleId: profile.id });
//         if (user) {
//             return done(null, user);
//         }
//         if(!user) {
//             const user = new userModel({
//                 googleId: profile.id,
//                 name: profile.displayName,
//                 profile: profile.photos[0].value,
//                 email: profile.emails[0].value,
//                 role: 'user',
//             });
//             await user.save();
//         }
//         done(null, user);
//     }
// )
// )