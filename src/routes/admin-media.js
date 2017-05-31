const fs = require('fs');
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// initialize the file uploader
let uploader = multer({ dest: path.join(__dirname, '..', '..', 'content', 'media') });

router.use(bodyParser.json());

/**
* Get a list of all media files
*/
router.get('/', function(req, res) {
    let dirpath = path.join(__dirname, '..', '..', 'content', 'media');

    let files = fs.readdirSync(dirpath).filter(function(file) {
        return file.split('.').length > 1 && file.split('.')[0] !== '';
    });

    res.send({ error: false, files: files });
});

router.delete('/:filename', function(req, res) {
    let dirpath = path.join(__dirname, '..', '..', 'content', 'media');

    fs.unlink(path.join(dirpath, req.params.filename), function(err) {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send({ error: true, message: 'File does not exist' });
            }

            return res.send({ error: true, message: 'Unknown error deleting the file' });
        }

        res.send({ error: false, message: 'File deleted' });
    });
});

/**
* Upload a new media file
*/
router.post('/', uploader.single('file'), function(req, res) {
    let dirpath = path.join(__dirname, '..', '..', 'content', 'media');

    let extension = '.' + req.file.originalname.split('.').pop();

    fs.renameSync(path.join(dirpath, req.file.filename), path.join(dirpath, req.file.filename + extension));

    res.send({ error: false, file: req.file.filename + extension });
});

module.exports = router;