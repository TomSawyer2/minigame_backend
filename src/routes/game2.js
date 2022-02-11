var express = require('express');
var router = express.Router();
var apis = require('../controller/game2.js');

/* /api/v2下的请求匹配 */
router.get('/', function (req, res, next) {
	apis.test(req, res, next);
});

module.exports = router;
