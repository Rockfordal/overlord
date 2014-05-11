/**
 * SalesimportController
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
    Salesimport.find(function foundSalesimports(err, salesimports) {
      if (err) return next(err);
      res.view({
        sales: salesimports
      });
    });
  },

  'new': function (req, res) {
    res.view();
  },

  edit: function(req, res, next) {
    Salesimport.findOne(req.param('id'), function foundSalesimport(err, salesimport) {
      if (err) return next(err);
      if (!salesimport) return next();

      res.view({
        sales: salesimport
      })
    })
  },

  create: function (req, res, next) {

    var salesObj = {
      namn:    req.param('namn'),
      orgnr: req.param('orgnr'),
      orgnamn: req.param('orgnamn'),
      titel:   req.param('titel'),
      telefon:   req.param('telefon'),
      branschkod: req.param('branschkod'),
      branschtext: req.param('branschtext'),
      anstellda: req.param('anstellda'),
      omsintervall: req.param('omsintervall'),
      utdadr: req.param('utdadr'),
      besadr: req.param('besadr'),
      postnr: req.param('postnr'),
      bespostnr: req.param('bespostnr'),
      postort: req.param('postort'),
      bespostort: req.param('bespostort')
    };

    Salesimport.create(salesObj, function saleCreated(err, salesimport) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('salesimport/new');
      }

      salesimport.save(function(err, salesimport) {
        if (err) return next(err);
        //salesimport.action = " created a company"
        //User.publishCreate(user);
        res.redirect('/salesimport/show/' + salesimport.id)
      });
    })
  },

  update: function (req, res, next) {

    var salesObj = {
      namn:    req.param('namn'),
      orgnr: req.param('orgnr'),
      orgnamn: req.param('orgnamn'),
      titel:   req.param('titel'),
      telefon:   req.param('telefon'),
      branschkod: req.param('branschkod'),
      branschtext: req.param('branschtext'),
      anstellda: req.param('anstellda'),
      omsintervall: req.param('omsintervall'),
      utdadr: req.param('utdadr'),
      besadr: req.param('besadr'),
      postnr: req.param('postnr'),
      bespostnr: req.param('bespostnr'),
      postort: req.param('postort'),
      bespostort: req.param('bespostort')
    };

    Salesimport.update(req.param('id'), salesObj, function salesUpdated(err) {
        if (err) {
          return res.redirect('/salesimport/edit/' + req.param('id'));
          // return res.redirect('/salesimport');
        }

        res.redirect('/salesimport');
      }
    )
  },

  destroy: function(req, res, next) {
    Salesimport.findOne(req.param('id'), function foundSales(err, salesimport) {
      if (err) return next(err);
      if (!salesimport) return next("Sale doesn't exist.");

      Salesimport.destroy(req.param('id'), function saleDestroyed(err) {
        if (err) return next(err);

        //Salesimport.publishUpdate(salesimport.id, {
        //  name: salesimport.name,
        //  action: ' has been destroyed.'
        //});
      });

      res.redirect('/salesimport');

    })

  }

};