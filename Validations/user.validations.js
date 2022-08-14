const { body } = require('express-validator');
const User = require('../Models/user.model');



const validateUser = (method) => { 
    switch (method) {
        case 'registerUser' : {
            return [
                body('email').exists().withMessage('Required Field'). // email is a required field
                isEmail().withMessage('format email required'). // email format is required
                custom(async (email) => {
                    const registeredUser = await User.findOne({email})
                    if (registeredUser) {
                        throw new Error()
                    }
                   }
                   ).withMessage('email already in use'),  // check if the user already registered before
                
                body('password').exists().withMessage('Required Field'). // password is q required field
                isLength({ min: 5}).withMessage('Minimum 5 characters'), // passowrd should be minimum 5 characters
            ]
        }
        case 'loginUser' : {
            return [
                body('email').exists().withMessage('Please enter your email'). // email is required
                isEmail().withMessage('format email required') // email format is required
                .custom(async (email) => {
                    const loggedUser = await User.findOne({email})
                    if (!loggedUser) {
                        throw new Error()
                    }
                }).withMessage('Please register first'), // check if the user already registered before

                body('password').exists().withMessage('please enter your password'), // password is required
            ]
        }
    }
}


module.exports = validateUser;