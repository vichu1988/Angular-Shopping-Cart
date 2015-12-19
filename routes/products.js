var express = require('express'),
    router = express.Router(),
    jsonData = require('../Cart.json');

/* GET users listing. */
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    res.send(jsonData);
});

module.exports = router;
