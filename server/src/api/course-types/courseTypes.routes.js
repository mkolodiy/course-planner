const express = require('express');
const CourseType = require('./courseTypes.model');

const router = express.Router();

router.post('/', async (req, res, next) => {});
router.get('/', async (req, res, next) => {});
router.post('/:id', async (req, res, next) => {});
router.delete('/:id', async (req, res, next) => {});

module.exports = router;
