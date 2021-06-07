const express = require('express');
const router = express.Router();
// const Authentication = require('../middlewares/token-validation')
const ContentService = require('../services/content.service');
const { getAllContent, getContentById, createContent, deleteContentById } = require('../controller/Content.controller');
const contentService = new ContentService();

// router.use(Authentication);
router.get('/all', (req, res, next) => getAllContent(req, res, contentService));
router.get('/:id', (req, res, next) => getContentById(req, res, contentService));
router.post('/', (req, res, next) => createContent(req, res, contentService));
router.delete('/:id', (req, res, next) => deleteContentById(req, res, contentService));
// router.put('/', (req, res, next) => updateAdmin(req, res, attendService));

module.exports = router;