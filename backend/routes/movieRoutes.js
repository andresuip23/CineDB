const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/movies', movieController.createMovie);
router.delete('/movies/:movie_id', movieController.deleteMovie);

module.exports = router;