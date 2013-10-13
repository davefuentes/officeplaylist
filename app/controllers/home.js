
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {

    var profile = null

    if(req.user) profile = req.user

    res.render('home', {
        title: 'Welcome!',
        profile: profile
    })
}
