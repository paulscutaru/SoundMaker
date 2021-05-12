const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('token')
    if (!token)
        return res.json({ error: 'User is not logged in!' })

    try {
        const validToken = verify(token, '9305029939')
        req.user = validToken
        if (validToken) {
            return next()
        }
    }
    catch (e) {
        return res.json({ error: e })
    }
}

module.exports = { validateToken };