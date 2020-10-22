
const { API_TOKEN } = require('./config')
const logger = require('./logger')

function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization')
  console.log('Auth Token: ' + authToken)
  logger.error(`Unauthorized request to path: ${req.path}`)
console.log("auth token: "+authToken.split(' ')[1])
console.log("API_TOKEN: " + API_TOKEN)
  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
}

module.exports = validateBearerToken