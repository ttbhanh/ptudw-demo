'use strict';
const controller = {};

controller.showLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login', { message: req.flash('loginMessage'), reqUrl: req.query.reqUrl });
}

controller.showProfile = (req, res) => {
    res.render('profile', {
        user: req.user
    });
}

controller.showUserAccount = (req, res) => {
    res.render('user', {
        user: req.user,
        isLocal: (req.user.type == 'local')
    })
}

controller.showRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('register', { message: req.flash('signupMessage') });
}

controller.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

controller.changePassword = async (req, res) => {
    let User = require('../models').User;
    try {
        let user = await User.findByPk(req.user.id);
        if (user) {
            const { isValidPassword, generateHash } = require('./password');
            if (isValidPassword(req.body.oldPassword, user.password)) {
                await User.update({
                    password: generateHash(req.body.password)
                }, {
                    where: { id: req.user.id }
                })
                return res.render('user', { message: 'Your password has been updated!' });
            } else {
                return res.render('user', { message: 'Old password NOT match!' });
            }
        }
        res.redirect('/login');

    } catch (error) {
        next(error);
    }
}

// route middleware to ensure user is logged in
controller.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect(`/login?reqUrl=${req.originalUrl}`);
}

module.exports = controller;