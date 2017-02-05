// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // Sequelize is Promisified
// the 'then' method is called after all callbacks and events are processed succesfully
// the 'catch' method is called if an error occurs

// the code below is called from a context that has an Express request 'req' and
// requires callback 'done' to be called when done

// Sequelize is Promisified
// the 'then' method is called after all callbacks and events are processed succesfully
// the 'catch' method is called if an error occurs

// the code below is called from a context that has an Express request 'req' and
// requires callback 'done' to be called when done

User.findOne({ where: { localemail: email }})
    .then(function(existingUser) { // findOne succesful, zero or one records found

    // check to see if there's already a user with that email
    if (existingUser) 
        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));

    //  If we're logged in, we're connecting a new local account.
    if(req.user) {
        // update user properties
        var user = req.user;
        user.localemail = email;
        user.localpassword = User.generateHash(password);
        user.save()
            .then (function() {
                // user save succesful
                done(null, user);
            })
            .catch(function (err) {
                // user save failed
                done(null, false, req.flash('loginMessage', err));
            });
        } else {
        //  We're not logged in, so we're creating a brand new user.
        // create the user
        var newUser = User.build ({
            localemail: email, 
            localpassword: User.generateHash(password)
        });
        // store the newUser to the database
        newUser.save()
            .then(function() {
                // newUser save succesful
                done (null, newUser);
            })
            .catch(function(err) {
                // newUser save failed
                done(null, false, req.flash('loginMessage', err));});
            }
        })
    .catch(function (e) {
        // some error occurred while executing the findone query
        done(null, false, req.flash('loginMessage',e.name + " " + e.message));              
    })