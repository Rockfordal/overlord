/**
 * CampainController
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
    Campain.find(function foundCampains(err, campains) {
      if (err) return next(err);
      res.view({
        campains: campains
      });
    });
  },

  'new': function (req, res) {
    res.view();
  },

  edit: function(req, res, next) {
    Campain.findOne(req.param('id'), function foundCampain(err, campain) {
      if (err) return next(err);
      if (!campain) return next();

      res.view({
        campain: campain
      })
    })
  },

  create: function (req, res, next) {

    var campainObj = {
      namn: req.param('namn'),
      info: req.param('info'),
    };

    Campain.create(campainObj, function campainCreated(err, campain) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('campain/new');
      }

      campain.save(function(err, campain) {
        if (err) return next(err);
        // campain.action = " created a company"
        // User.publishCreate(user);
        res.redirect('/campain/edit/' + campain.id)
      });
    })
  },

  update: function (req, res, next) {

    var campainObj = {
      namn: req.param('namn'),
      info: req.param('info'),
    };

    Campain.update(req.param('id'), campainObj, function campainUpdated(err) {
        if (err) {
          return res.redirect('/campain/edit/' + req.param('id'));
        }

        res.redirect('/campain');
        // res.redirect('/campain/edit/' + req.param('id'));
      }
    )
  },

  destroy: function(req, res, next) {
    Campain.findOne(req.param('id'), function foundCampain(err, campain) {
      if (err) return next(err);
      if (!campain) return next("Kampanjen finns inte");

      Campain.destroy(req.param('id'), function campainDestroyed(err) {
        if (err) return next(err);

        //Salesimport.publishUpdate(salesimport.id, {
        //  name: salesimport.name,
        //  action: ' has been destroyed.'
        //});
      });

      res.redirect('/campain');
    })

  }
};
