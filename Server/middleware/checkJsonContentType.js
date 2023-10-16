// Custom middleware to check the Content-Type of incoming requests
const checkJsonContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];

  // Check if there is no Content-Type header or it's not 'application/json'
  if (!contentType || contentType !== 'application/json') {
    return res.status(400).json({ error: 'Only JSON content is accepted' });
  }

  // If the Content-Type is valid JSON, continue to the next middleware
  next();
};

// Export the middleware to be used in other parts of the application
module.exports = checkJsonContentType;
