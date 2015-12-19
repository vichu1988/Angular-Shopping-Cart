var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Node-React-Tesco', datapath: '/products', appPath: '/poc'});
});

module.exports = router;
