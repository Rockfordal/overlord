
module.exports = function(req, res, ok) {

    var userprop = req.session.hasOwnProperty("User");

    if (userprop && req.session.User.hasOwnProperty("id")) {
      var sessionUserMatchesId = req.session.User.id === req.param('id');
      var isAdmin = req.session.User.admin;

      if (!(sessionUserMatchesId || isAdmin)) {
        var noRightsError = [
          {name: 'noRights', message: 'You must be an admin.'}
        ];
        req.session.flash = {
          err: noRightsError
        };
        res.redirect('/session/new');
        return;
      }

      ok();
    } else {
      var noSessionError = [{name: 'noSession', message: 'You must be an logged in.'}];
      req.session.flash = { err: noSessionError };
      res.redirect('/session/new');
  }

}