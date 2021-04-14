const user = require('../../database/mongo/models/user');


module.exports.register = (req, res, next) => {
    console.log('this is working well');
    const userData = new user(req.body);
    userData.save((err, user) => {
        if (err) {
            if (err.code === 11000)
                res.status(422).send(['duplicate email address found found']);
            else
                return next(err);
        } else {
            res.send(user);
        }
    });
}
