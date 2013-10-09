
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {

    var name = null

    if(req.user) name = req.user.name

    res.render('home', {
        title: 'Welcome!',
        name: name
    })
}
