var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorcode = require('./src/common/config.js').errorcode;

var game1Router = require('./src/routes/game1');
var game2Router = require('./src/routes/game2');

var app = express();
//引入插件
var vertoken = require('./src/common/token')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cors = require('cors')
app.use(cors())

//allow custom header and CORS
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	if (req.method == 'OPTIONS') {
		res.send(200);
	}
	else {
		next();
	}
});

require("./src/db");

//解析token获取用户信息
app.use(function (req, res, next) {
	var token = req.get('token');
	if (token !== undefined) {
		vertoken.getToken(token).then((data) => {
			req.data = data;
			return next();
		}).catch((error) => {
			console.log(error);
			return next({ status: errorcode.TOKEN_EXPIRED, msg: 'token失效' });
		})
	} else {
		next();
	}
});

app.use('/api/v1', game1Router);
app.use('/api/v2', game2Router);

app.use(function (req, res, next) {
	next(createError(404)); // 无匹配接口时的返回
});

app.use(function (err, req, res, next) {
	res.send({ status: err.status, msg: err.msg, data: null }) // 代码中使用next抛出的错误拦截
});

app.use(function (err, req, res, next) {
	res.send({ status: -1, msg: '未知错误', data: null }) // 最后的错误拦截
});

module.exports = app;
