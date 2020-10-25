const winston = require('winston')
const { NODE_ENV, API_TOKEN } = require('./config')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  })

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }
  //test
  module.exports = logger
