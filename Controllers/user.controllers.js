const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../Models/user.model');




 // get home page
 const homePage = async(req,res) => {
    res.render('../UI/views/home')
 }



 // auth middelware
 const isAuth = (req,res,next) => {
    const sessUser = req.session.isAuth;
    if(sessUser) {
        next();
    }
    else {
        res.redirect('/login')
    }
  };




 // get register page  
 const registerPage = async(req, res) => { 
    res.render('../UI/views/register') 
 }

 // register user
 const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
      if(!errors.isEmpty()) {
          const errorText = errors.array()
          res.render('../UI/views/register', {
            errorText
          })
      }
       else {
        const {email, password} = req.body
  
          const hashPassword = await bcrypt.hash(password, 10);
                  newUser = new User ({
                  email,
                  password: hashPassword
              })
          await newUser.save();
          req.session.isAuth = true;
            res.redirect('/dashboard')
  
         } 
      }
     catch (error) { 
       throw error
    }
  } 



 // get login page
 const loginPage = async(req, res) => {
    res.render('../UI/views/login')
 }

 // login user 
 const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
      if(!errors.isEmpty()) {
          const errorText = errors.array()
          res.render('../UI/views/login', {
            errorText
          })
      }
       else {
          const {email, password} = req.body;
          const user = await User.findOne({ email });
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch){
             return res.render('../UI/views/login')
          }
          req.session.isAuth = true;
             res.redirect('/dashboard')
      }
  }   catch (error) { 
         throw error  
    }
  } 



  // get dashboard page
  const loadUser = async(req,res) => {
    res.render('../UI/views/dashboard')
  }

  

 // logout user
 const logoutUser = async(req, res) => {
    req.session.destroy((error) => {
        if (error) throw error
        res.redirect('/')
    })
 }




module.exports =  { homePage, loadUser, isAuth, registerPage, registerUser, loginPage, loginUser, logoutUser } ;