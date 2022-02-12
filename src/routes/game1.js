var express = require('express');
var router = express.Router();
var apis = require('../controller/game1.js');

/* /api/v1下的请求匹配 */
router.get('/', function (req, res, next) {
	apis.test(req, res, next);
});

router.post('/updateInfo', function (req, res, next) {
	apis.updateInfo(req, res, next);
});

router.get('/getrank', function (req, res, next) {
	apis.getrank(req, res, next);
});

module.exports = router;
