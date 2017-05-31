const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// set routes to accept application/json
router.use(bodyParser.json());

/**
* Get a list of all pages
*/
router.get('/', function(req, res) {
    const dirpath = path.join(__dirname, '..', '..', 'content', 'pages');

    let page_names = fs.readdirSync(dirpath)
        .filter(file => fs.lstatSync(path.join(dirpath, file)).isDirectory());
    let pages = [];

    const loadPage = function(page_path) {
        let new_page = {
            name: page_path.split(path.sep).pop(),
            id: encodeURIComponent(new Buffer(page_path).toString('base64')),
            config: {},
            content: '',
            children: []
        };

        try { new_page.config = YAML.load(path.join(page_path, 'config.yaml')); } catch(e) { }
        try { new_page.content = fs.readFileSync(path.join(page_path, 'markup.md'), 'utf8'); } catch(e) { }

        return new_page;
    };

    // recursive function to get all child pages
    const recurse = function(current_path, parent_page) {
        let page = loadPage(current_path);

        let child_pages = fs.readdirSync(current_path)
            .filter(file => fs.lstatSync(path.join(current_path, file)).isDirectory());

        child_pages.forEach(child_page => {
            page.children.push(recurse(path.join(current_path, child_page), child_page));
        });

        return page;
    };

    page_names.forEach((page) => pages.push(recurse(path.join(dirpath, page), page)));

    res.send({ error: false, pages: pages });
});

/**
* Get a single page
*/
router.get('/:id', function(req, res) {
    let page_path = new Buffer(decodeURIComponent(req.params.id), 'base64').toString();
    let yaml = YAML.load(path.join(page_path, 'config.yaml'));
    let content = fs.readFileSync(path.join(page_path, 'markup.md'), 'utf8');

    res.send({error: false, page: {config: yaml, content: content}});
});

/**
* Update a single page
*/
router.post('/:id', function(req, res) {
    let page_path = new Buffer(decodeURIComponent(req.params.id), 'base64').toString();
    let config = req.body.config;
    let content = req.body.content;

    if (config) {
        let file_path = path.join(page_path, 'config.yaml');
        let yaml = YAML.stringify(config);

        fs.writeFileSync(file_path, yaml);
    }

    if (content) {
        let file_path = path.join(page_path, 'markup.md');

        fs.writeFileSync(file_path, content);
    }

    res.send(config);
});

module.exports = router;