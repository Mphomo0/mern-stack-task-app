const checkMaxLength = (req, res, next) => {
    const characterLimit = 140;

    // Check the length of the request body (assuming it's a POST request)
    if (req.method === 'POST' && req.body && req.body.description && req.body.description.length > characterLimit) {
        res.status(400).json({ error: 'Request body exceeds character limit' });
    } else {
        next(); // Proceed to the next middleware
    }
};

module.exports = checkMaxLength;