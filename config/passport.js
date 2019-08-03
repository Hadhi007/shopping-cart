const LocalStrategy=require('passport-local').strategy
const bcrypt=require('bcrypt-nodejs')
function initialize(passport ) {
    const authenticateUser =(email,password,done){
const user=getUserByEmail(email)
        if (user==null){
            return done(null,false,{message:'no user with that email'})
        }
    }

    passport.use(new LocalStrategy({_usernameField:'email'}),
        authenticateUser)
    passport._serializeUser((USER,done) {})
    passport._deserializeUser((USER,done){})
}