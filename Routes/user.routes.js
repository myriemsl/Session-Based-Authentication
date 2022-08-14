const express = require('express');
const router = express.Router();


const validateUser = require('../Validations/user.validations');
const { homePage, loadUser, isAuth, registerPage, registerUser, loginPage, loginUser, logoutUser }  = require('../Controllers/user.controllers');


// home page
router.get('/', homePage);


// register user
router.get('/register', registerPage);
router.post('/register', validateUser('registerUser'), registerUser);


// login user
router.get('/login', loginPage);
router.post('/login', validateUser('loginUser'), loginUser);


// load user
router.get('/dashboard', isAuth, loadUser);


// logout user
router.post('/logout', logoutUser);


module.exports = router;