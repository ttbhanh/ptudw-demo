'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/authController');
const { body, showErrorMessageIfAvailable } = require('../controllers/validator');

// PROFILE =========================
router.get('/profile', controller.isLoggedIn, controller.showProfile);

// USER ACCOUNT ====================
router.get('/user', controller.isLoggedIn, controller.showUserAccount)

// CHANGE PASSWORD =================
// Xu ly doi mat khau
router.post('/user', controller.isLoggedIn,
    body('oldPassword').trim().notEmpty().withMessage('Old Password can not be empty.'),
    body('password').trim().notEmpty().withMessage('Password can not be empty.'),
    body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    showErrorMessageIfAvailable('user'),
    controller.changePassword
)

// LOGOUT ==============================
router.get('/logout', controller.logout);

// LOGIN ===============================
// Hien thi form login
router.get('/login', controller.showLogin);

// Xu ly form login
router.post("/login",
    body('email')
        .trim().notEmpty().withMessage('Email can not be empty.')
        .isEmail().withMessage('Invalid Email address.'),
    body('password')
        .trim().notEmpty().withMessage('Password can not be empty.'),
    showErrorMessageIfAvailable('login'),
    (req, res, next) => {
        let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/profile';
        passport.authenticate('local-login', {
            successRedirect: reqUrl, // chuyen huong den trang web sau khi dang nhap thanh cong
            failureRedirect: `/login?reqUrl=${reqUrl}`, // chuyen huong den trang web khi co loi 
            failureFlash: true // cho phep su dung flash messages
        })(req, res, next);
    }
);

// SIGNUP =================================
// hien thi signup form
router.get('/register', controller.showRegister);

// xu ly signup form
router.post('/register',
    body('firstName').trim().notEmpty().withMessage('First Name can not be empty.'),
    body('lastName').trim().notEmpty().withMessage('Last Name can not be empty.'),
    body('email')
        .trim().notEmpty().withMessage('Email can not be empty.')
        .isEmail().withMessage('Invalid Email address.'),
    body('password').trim().notEmpty().withMessage('Password can not be empty.'),
    body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    showErrorMessageIfAvailable('register'),
    passport.authenticate('local-signup', {
        successRedirect: '/profile', // chuyen huong den trang web sau khi dang ky thanh cong
        failureRedirect: '/register', // chuyen huong den trang web khi co loi xay ra
        failureFlash: true // cho phep su dung flash messages
    })
);

// FACEBOOK =================================
// gui toi facebook de chung thuc nguoi dung
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

// xu ly callback sau khi facebook chung thuc nguoi dung
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);


// GOOGLE =================================
// gui toi google de chung thuc nguoi dung
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// xu ly callback sau khi google chung thuc nguoi dung
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);

module.exports = router;


