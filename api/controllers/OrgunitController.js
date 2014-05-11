/**
 * OrgunitController
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
    Orgunit.find(function foundOrgunit(err, orgunits) {
      if (err) return next(err);
      res.view({
        orgunits: orgunits
      });
    });
  },

  'new': function (req, res) {
    res.view();
  },

  edit: function(req, res, next) {
    Orgunit.findOne(req.param('id'), function foundOrgunit(err, orgunit) {
      if (err) return next(err);
      if (!orgunit) return next();

      res.view({
        orgunit: orgunit
      })
    })
  },

  create: function (req, res, next) {

    var orgunitObj = {
      namn: req.param('namn'),
      orgnr: req.param('orgnr'),
    };

    Orgunit.create(orgunitObj, function orgunitCreated(err, orgunit) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('orgunit/new');
      }

      orgunit.save(function(err, orgunit) {
        if (err) return next(err);
        // campain.action = " created a company"
        // User.publishCreate(user);
        res.redirect('/orgunit');
      });
    })
  },

  update: function (req, res, next) {

    var orgunitObj = {
      namn: req.param('namn'),
      orgnr: req.param('orgnr'),
    };

    Orgunit.update(req.param('id'), orgunitObj, function orgunitUpdated(err) {
        if (err) {
          return res.redirect('/orgunit/edit/' + req.param('id'));
        }

        res.redirect('/orgunit');
      }
    )
  },

  destroy: function(req, res, next) {
    Orgunit.findOne(req.param('id'), function foundOrgunit(err, orgunit) {
      if (err) return next(err);
      if (!orgunit) return next("Kampanjen finns inte");

      Orgunit.destroy(req.param('id'), function orgunitDestroyed(err) {
        if (err) return next(err);

        // Orgunit.publishUpdate(orgunit.id, {
        //   name: orgunit.name,
        //   action: ' has been destroyed.'
        // });
      });

      res.redirect('/orgunit');
    })

  }
};
