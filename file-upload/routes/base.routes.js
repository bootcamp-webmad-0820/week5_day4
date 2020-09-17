const express = require('express')
const router = express.Router()

const Picture = require('./../models/picture.model')

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/gallery', (req, res) => {

    Picture.find()
        .then(photos => res.render('gallery', { photos }))
        .catch(err => console.log('Hubo un error:', err))

})


module.exports = router
