const express = require('express')
const router = express.Router()

const localUploader = require('./../configs/local-upload.config')
const cdnUploader = require('./../configs/cloudinary.config')

const Picture = require('./../models/picture.model')

// Local files form upoload
router.get('/local-upload', (req, res) => res.render('file-upload/local-file-upload'))
router.post('/local-upload', localUploader.single('imageInput'), (req, res) => {

    const { nameInput } = req.body

    console.log('Esta es la info que engancha multer:', req.file)

    Picture
        .create({
            name: nameInput,
            path: `/uploads/${req.file.filename}`,
            originalName: req.file.originalname
        })
        .then(() => res.redirect('/gallery'))
        .catch(err => console.log('Hubo un error:', err))
})




// Local files form upoload
router.get('/cdn-upload', (req, res) => res.render('file-upload/cdn-file-upload'))
router.post('/cdn-upload', cdnUploader.single('imageInput'), (req, res) => {

    const { nameInput } = req.body

    Picture
        .create({
            name: nameInput,
            path: req.file.path,                 // URL ABSOLUTA DE CLOUDINARY
            originalName: req.file.originalname
        })
        .then(() => res.redirect('/gallery'))
        .catch(err => console.log('Hubo un error:', err))
})


module.exports = router