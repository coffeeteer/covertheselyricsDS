
// load the things we need
var bcrypt   = require('bcrypt-nodejs');


// define the schema for our user model
//var userSchema = mongoose.Schema({});

'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    
        localemail: DataTypes.STRING(40),
        localpassword: DataTypes.STRING(20),   
  
        fbid: DataTypes.STRING(40),
        fbtoken: DataTypes.STRING(20),
        fbemail: DataTypes.STRING(20),
        fbname: DataTypes.STRING(20),

        twitterid: DataTypes.STRING(20),
        twittertoken: DataTypes.STRING(20),
        twitterdisplayname: DataTypes.STRING(20),
        twitterusername: DataTypes.STRING(20),

        googleid: DataTypes.STRING(20),
        googletoken: DataTypes.STRING(20),
        googleemail: DataTypes.STRING(20),
        googlename: DataTypes.STRING(20)
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    classMethods: {
      generateHash : function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },            
    },
      instanceMethods: {            
      validPassword : function(password) {
        return bcrypt.compareSync(password, this.localpassword);
      }
    }
  });
  return user;
};