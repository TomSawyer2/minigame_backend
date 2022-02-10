var express = require('express');
var router = express.Router();
var apis = require('../controller/users.js');

/* /user下的请求匹配 */
router.get('/', function (req, res, next) {
	apis.test(req, res, next);
});

module.exports = router;
