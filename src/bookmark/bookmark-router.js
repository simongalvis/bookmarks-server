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
    .post((req, res) =>{
    const { title, url, description, rating} = req.body;

        if(!title){
            logger.error(`Title is required`)
            return res
                .status(400)
                .send('Invalid data')
        }
        if(!url){
            logger.error(`url is required`)
            return res
                .status(400)
                .send('Invalid data')
        }
        const id = uuid();

        const bookmark = {
            id,
            title,
            url,
            description,
            rating,
        }
        
        bookmarks.push(bookmark);

        logger.info(`Card with id ${id} created`);
        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${id}`)
            .json(bookmark)
    })

/* 
bookmarkRouter
    .router('/bookmark/:bookmark_id') */
 

module.exports = bookmarkRouter;