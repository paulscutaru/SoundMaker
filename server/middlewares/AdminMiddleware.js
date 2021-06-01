const validateAdmin = (req, res, next) => {
    const password = req.header('password')

    try {
        if (password === 'admin123') {
            return next()
        }
    }
    catch (e) {
        return res.json({ error: e })
    }
}

module.exports = { validateAdmin };