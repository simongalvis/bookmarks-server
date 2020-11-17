const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('winston')
const { bookmarks } = require('../store')
const BookmarkService = require('./bookmark-service')

const bookmarkRouter = express.Router()
const bodyParser = express.json()


bookmarkRouter
    .route('/bookmark')
    .get((req, res, next) =>{
      const knexInstance = req.app.get('db')
      BookmarkService.getAllBookmarks(knexInstance)
        .then(bookmarks => {
          res.json(bookmarks)
        })

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
    .delete((req, res) =>{
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id)

        if(bookmarkIndex === -1){
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Not Found');
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted.`);
        res
            .status(204)
            .end();
    });



module.exports = bookmarkRouter;
