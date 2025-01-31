const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const movieController = require('../controllers/movieController');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/:userid/movies', movieController.getMoviesByUser);

module.exports = router;