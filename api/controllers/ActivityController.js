/**
 * ActivityController
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
    Activity.find(function foundActivity(err, activitys) {
      if (err) return next(err);
      res.view({
        activitys: activitys
      });
    });
  },

  'new': function (req, res) {
    // res.view();

    var activityObj = {
      namn: '',
      org_id: req.param('org_id')
    };

    Activity.create(activityObj, function activityCreated(err, activity) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('activity/new');
      }

      // Bort med undefined
      activity.namn = '';
      activity.datum = '';
      activity.tid = '';
      activity.info = '';

      activity.save(function(err, activity) {
        if (err) return next(err);
        // campain.action = " created a company"
        // User.publishCreate(user);
        res.redirect('/activity/edit/' + activity.id);
      });
    })
  },

  edit: function(req, res, next) {

    Activity.findOne(req.param('id'), function foundActivity(err, activity) {
      if (err) return next(err);
      if (!activity) return next();

      var orgid = activity.org_id;
      if (orgid) {

        Orgunit.findOne(orgid, function foundOrgunit(err, orgunit) {
          if (err) return next(err);

          res.view({
            activity: activity,
            orgunit: orgunit
          })
        });
      } else {
        res.view({
          activity: activity
        })
      }

    })
  },

  create: function (req, res, next) {

    var activityObj = {
      namn: req.param('namn'),
      datum: req.param('datum'),
      tid: req.param('tid'),
      info: req.param('info'),
      org_id: req.param('org_id')
    };

    Activity.create(activityObj, function activityCreated(err, activity) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('activity/new');
      }

      activity.save(function(err, activity) {
        if (err) return next(err);
        // campain.action = " created a company"
        // User.publishCreate(user);
        res.redirect('/activity');
      });
    })
  },

  update: function (req, res, next) {

    var activityObj = {
      namn: req.param('namn'),
      datum: req.param('datum'),
      tid: req.param('tid'),
      info: req.param('info'),
      org_id: req.param('org_id')
    };

    Activity.update(req.param('id'), activityObj, function activityUpdated(err) {
        if (err) {
          return res.redirect('/activity/edit/' + req.param('id'));
        }

        res.redirect('/activity/edit/' + req.param('id'));
      }
    )
  },

  destroy: function (req, res, next) {
    Activity.findOne(req.param('id'), function foundActivity(err, activity) {
      if (err) return next(err);
      if (!activity) return next("Aktiviteten finns inte");

      Activity.destroy(req.param('id'), function activityDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/activity');
    })

  },

  findbyorgunitid: function (req, res, next) {

        Activity.findOne()
          .where({org_id: req.param('id')})
          .exec(function (err, response) {
            if (err) return next(err);
            if (!response) return res.redirect('/activity/new?org_id=' + req.param('id'));
            res.redirect('/activity/edit/' + response.id);
          });

  }
};
