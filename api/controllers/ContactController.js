/**
 * ContactController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
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

module.exports = {

  index: function (req, res, next) {
    Contact.find(function foundContact(err, contacts) {
      if (err) return next(err);
      res.view({
        contacts: contacts
      });
    });
  },

  'new': function (req, res) {
    res.view();
  },

  edit: function(req, res, next) {
    Contact.findOne(req.param('id'), function foundContact(err, contact) {
      if (err) return next(err);
      if (!contact) return next();

      res.view({
        contact: contact
      })
    })
  },

  create: function (req, res, next) {

    var contactObj = {
      namn: req.param('namn'),
      titel: req.param('titel'),
      info: req.param('info'),
    };

    Contact.create(contactObj, function contactCreated(err, contact) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('contact/new');
      }

      contact.save(function(err, contact) {
        if (err) return next(err);
        // campain.action = " created a company"
        // User.publishCreate(user);
        res.redirect('/contact');
      });
    })
  },

  update: function (req, res, next) {

    var contactObj = {
      namn: req.param('namn'),
      titel: req.param('titel'),
      info: req.param('info'),
    };

    Contact.update(req.param('id'), contactObj, function contactUpdated(err) {
        if (err) {
          return res.redirect('/contact/edit/' + req.param('id'));
        }

        res.redirect('/contact');
      }
    )
  },

  destroy: function(req, res, next) {
    Contact.findOne(req.param('id'), function foundContact(err, contact) {
      if (err) return next(err);
      if (!contact) return next("Kontakten finns inte");

      Contact.destroy(req.param('id'), function contactDestroyed(err) {
        if (err) return next(err);

        // Contact.publishUpdate(contact.id, {
        //   name: contact.name,
        //   action: ' has been destroyed.'
        // });
      });

      res.redirect('/contact');
    })

  }
};
