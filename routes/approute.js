/**
 * Created by vsury1 on 9/26/15.
 */
var express = require('express'),
    router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('products');
});

module.exports = router;