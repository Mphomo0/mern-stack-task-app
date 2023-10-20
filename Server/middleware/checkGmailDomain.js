// Custom middleware to check email domain
const checkGmailDomain = (req, res, next) => {
  const { email } = req.body // Assuming the email is in the request body

  if (email && email.endsWith('@gmail.com')) {
    next() // Continue to the next middleware or route
  } else {
    return res.status(400).json({
      error: 'Invalid email domain. Only @gmail.com addresses are allowed.',
    })
  }
}

module.exports = checkGmailDomain
