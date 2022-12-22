'use strict';
const express = require('express');
const router = express.Router();

// Hien thi trang chu
router.get('/', (req, res) => {
    res.render('index');
});

// Tao tables trong database
router.get('/createTables', async (req, res) => {
    const models = require('../models');
    await models.sequelize.sync();
    res.send('tables created!');
})

module.exports = router;