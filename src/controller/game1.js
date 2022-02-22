var errorcode = require('../common/config.js').errorcode;
var gameOne = require("../model/game_one");
var vertoken = require('../common/token');

const apis = {
    test(req, res, next) {
        res.send({ status: 0, msg: 'Hello World For Game1', data: null }); // 此处为正常返回请求示例
    },

    updateInfo(req, res, next) {
        // 数据库更新数据示例
        const data = req.body;
        if (data.score <= 0) {
            next({ status: errorcode.UPDATE_ERR_1, msg: '更新成绩错误' })
        } else {
            gameOne.findOne({ 'token': req.get('token') }).exec((err, response) => {
                if (err) console.log(err);
                if (response == null) {
                    next({ status: errorcode.LOGIN_ERR_1, msg: '登录错误' })
                } else if (response.score !== undefined) {
                    next({ status: errorcode.TOKEN_USED_1, msg: 'token已使用，需要重新登录' })
                } else {
                    response.username = data.username;
                    response.phone = data.phone;
                    response.score = data.score;
                    response.studentId = data.studentId;
                    response.save((err) => {
                        if (err) ({ status: errorcode.UPDATE_ERR_1, msg: '更新成绩错误' })
                        else res.send({ status: 0, msg: '操作成功', data: null })
                    })
                }
            });
        }
    },

    login(req, res, next) {
        vertoken.setToken().then(token => {
            let newRecord = new gameOne({ token: token })
            newRecord.save((err) => {
                if (err) next({ status: errorcode.LOGIN_ERR_1, msg: '登录错误' })
                res.send({ status: 0, msg: '登录成功', data: { token: token } });
            })
        });
    },

    getrank(req, res, next) {
        const data = req.query;
        if (data.number <= 0) {
            res.send({ status: 0, msg: '操作成功', data: null })
        } else if (data.number >= 50) {
            res.send({ status: 0, msg: '干啥呢，想把数据库全跑出来嘛', data: null })
        } else {
            // 数据库查找前{number}大数据示例
            gameOne.find().sort({ score: -1 }).skip(0).limit(data.number).exec((err, response) => {
                if (err) next({ status: errorcode.GET_RANK_ERR_1, msg: '查找排行榜错误' })
                var data = [];
                response.forEach(el => {
                    if (el.score) {
                        let { _id, username, phone, score, studentId } = el;
                        let output = {
                            id: _id,
                            username: username,
                            phone: phone,
                            studentId: studentId,
                            score: score
                        }
                        data.push(output);
                    }
                })
                res.send({ status: 0, msg: '操作成功', data: data })
            })
        }
    }
}

module.exports = apis
