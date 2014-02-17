
module.exports = function(req, res, ok) {
    var sessionUserMAtchesId = req.session.User.id === req.param('id');
    var isAdmin = req.session.User.admin;

    if (!(sessionUserMAtchesId || isAdmin)) {
        var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}];
        req.session.flash = {
            err: noRightsError
        };
        res.redirect('/session/new');
        return;
    }

    ok();

}