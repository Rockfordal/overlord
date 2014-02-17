/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  'new': function(req, res) {
    var oldDateObj = new Date();
    var ttl = 3600 * 5;
    var newDateObj = new Date(oldDateObj.getTime() + ttl);
    req.session.cookie.expires = newDateObj;
    //req.session.authenticated = true;
    //console.log(req.session);
    res.view('session/new');
  },

  create: function(req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'Du måste ange både användare och lösenord' }];
      req.session.flash = {
        err: usernamePasswordRequiredError
      }
      res.redirect('/session/new');
      return;
    }

    User.findOneByEmail(req.param('email')).done(function(err, user) {
      if (err) return next(err);
      if (!user) {
        var noAccountError = [{name: 'noAccount', message: 'The email adress ' + req.param('email') + ' not found.'}]
        req.session.flash = {
          err: noAccountError
        }
        res.redirect('/session/new');
        return;
      }

      // Compare password from  the form param to the encrypted password of the user found
      pass = req.param('password');
      bcrypt.compare(pass, user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', messsage: 'ogiltigt användarnamn eller lösenord.'}]
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;

        // Change status to online
         user.online = true
         user.save(function(err, user) {
             if (err) return next(err);

             if (req.session.User.admin) {
                 res.redirect('/user');
                 return;
             }

            // Redirect to their profile page
            res.redirect('/user/show/' + user.id);
         });
      });
    });
  },

  destroy: function(req, res, next) {

    User.findOne(req.session.User.id, function(){
        var userId = req.session.User.id;

        User.update(userId, {
            online: false
        }, function(err){
            if (err) return next(err);

          // Wipe out the session (log out)
          req.session.destroy();

          // Redirect the browser to the sign-in screenA
          res.redirect('/session/new');
        });
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

};
