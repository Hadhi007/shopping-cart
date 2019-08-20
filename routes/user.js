var express = require('express');
let bcrypt=require('bcrypt-nodejs');
var router = express.Router();
let dbConfig=require('../dbconfig/db-connect')

var csrf=require('csurf');
let csrfProtection=csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn,function(err,res,next){
    res.render('user/profile');
})
router.get('/',NotLoggedIn,function(req,res,next){
   next()

})
router.get('/signup',function (req,res) {

    res.render('user/signup',{csrfToken:req.csrfToken});
});
router.get('/signin',function (req,res) {

    res.render('user/signin',{csrfToken:req.csrfToken});
});
router.post('/signup',function (req,res){

    let password=req.body.password;
    let encryptedpassword=bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
    // console.log(req.body.email);
    let db=dbConfig.get();
    db.collection('user').insertOne({email:req.body.email,password:encryptedpassword},function(err,data){
        if(!err)
            res.redirect('/')
    });

});
router.post('/signin',function (req,res) {
    let username=req.body.email;
    let password=req.body.password;
    dbConfig.get().collection('user').findOne({"email":username},function(err,data){
        if(data){
            console.log(data)
            if(bcrypt.compareSync(password,data.password)){
                res.redirect('/user/profile')
            }
            else{
                res.end('Password mismatch')
            }
        }
        else{
            res.end('username or password mismatch')
        }
    });
});
router.get('/logout',function(req,res,next){
   req.logout()
        res.redirect('/')

})


module.exports = router;
function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next
     }
 res.redirect('/')
  }
function NotLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next
    }
    res.redirect('/')
}
