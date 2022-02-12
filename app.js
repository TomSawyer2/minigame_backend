var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var game1Router = require('./src/routes/game1');
var game2Router = require('./src/routes/game2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./src/db");

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
