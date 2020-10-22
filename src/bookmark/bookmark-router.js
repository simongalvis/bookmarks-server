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

 
bookmarkRouter
    .route('/bookmark/:id')
    .get((req, res) =>{
        const { id } = req.params;
        const bookmark = bookmarks.find(bookmark => bookmark.id == id);

        if(!bookmark){
            logger.error(`Bookmark with id ${id} not found`)
            return res
                .status(404)
                .send('Card not found');
        }

        res.json(bookmark);
    })
    
 

module.exports = bookmarkRouter;