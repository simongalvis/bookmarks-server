const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('winston')
const { bookmarks } = require('../store')


const bookmarkRouter = express.Router()
const bodyParser = express.json()

bookmarkRouter
    .route('/bookmark')
    .get((req, res) =>{
        res.json(bookmarks)
    })
 

module.exports = bookmarkRouter;