const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    console.log('this is jwthelper token checker', req.headers);

    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decode) => {
                if (err) return res.status(500).send({ auth: false, message: 'token authorization failed' });
                else {
                    console.log('this is working');
                    req._id = decode._id;
                    next();
                }
            }
        )
    }
}