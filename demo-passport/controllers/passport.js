'use strict';

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the models
const User = require('../models').User;

// load the auth variables
const { FACEBOOK_AUTH, GOOGLE_AUTH } = require('../config/auth.json');

// load util password functions
const { isValidPassword, generateHash } = require('./password');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async function (id, done) {
        try {
            let user = await User.findOne({
                attributes: ['id', 'email', 'firstName', 'lastName', 'type'],
                where: { id }
            });
            done(null, user);
        } catch (err) {
            done(err, null);

        }
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, (req, email, password, done) => {

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(() => localLoginAuthenticate(req, email, password, done));

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, (req, email, password, done) => {

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(() => localSignUp(req, email, password, done));

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        ...FACEBOOK_AUTH,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function (req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(() => socialLoginAuthenticate('facebook', req, token, profile, done));

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        ...GOOGLE_AUTH,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    }, function (req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(() => socialLoginAuthenticate('google', req, token, profile, done));
    }));
};

async function localLoginAuthenticate(req, email, password, done) {
    try {
        if (!req.user) { // neu user chua log in
            let user = await User.findOne({ where: { email, type: 'local' } });
            // kiem tra ton tai user trong  tai khoan
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            // kiem tra dung mat khau
            if (!isValidPassword(password, user.password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            // cho phep user login
            return done(null, user);
        }
        // neu user da login, bo qua
        return done(null, req.user);
    } catch (err) {
        return done(err);
    }
}

async function localSignUp(req, email, password, done) {
    try {
        if (!req.user) { // neu user chua login
            let user = await User.findOne({ where: { email, type: 'local' } });
            // kiem tra trung tai khoan email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
            // tao moi user
            let newUser = await User.create({
                email: email,
                password: generateHash(password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                type: 'local'
            });
            return done(null, newUser);

        }
        // user da login, bo qua, user phai tu logout truoc khi dang ky taikhoan khac
        return done(null, req.user);
    } catch (err) {
        return done(err);
    }

}

async function socialLoginAuthenticate(type, req, token, profile, done) {
    try {

        if (!req.user) { // 1. neu user chua log in, tao moi user va social account
            let profileId = profile.id;
            let firstName = profile.name.givenName;
            let lastName = profile.name.familyName;
            let email = (profile.emails[0].value || '').toLowerCase();

            let user = await User.findOne({
                where: { email, profileId, type },
            });

            if (!user) {  // neu chua ton tai user, tao moi
                let newUser = await User.create({
                    email, firstName, lastName, type,
                    profileId: profile.id
                });

                return done(null, newUser);
            } else { // neu da ton tai user, login
                return done(null, user)
            }
        } else { // 2. neu user da log in, bo qua, user phai logout de dang  nhap tai khoan khac
            return done(null, req.user);
        }

    } catch (err) {
        return done(err);
    }
}