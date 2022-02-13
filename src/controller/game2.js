var errorcode = require('../common/config.js').errorcode;
var gameTwo = require("../model/game_two");

const apis = {
    test(req, res) {
        res.send({ status: 0, msg: 'Hello World For Game2', data: null }); // 此处为正常返回请求示例
    },

    updateInfo(req, res, next) {
        // 数据库更新数据示例
        const data = req.body;
        if (data.score <= 0) {
            next({ status: errorcode.UPDATE_ERR_2, msg: '更新成绩错误' })
        } else {
            let newRecord = new gameTwo({
                username: data.username,
                phone: data.phone,
                score: data.score
            })
            newRecord.save((err) => {
                if (err) next({ status: errorcode.UPDATE_ERR_2, msg: '更新成绩错误' })
                res.send({ status: 0, msg: '操作成功', data: null });
            })
        }
    },

    getrank(req, res, next) {
        const data = req.query;
        if (data.number <= 0) {
            res.send({ status: 0, msg: '操作成功', data: null })
        } else {
            // 数据库查找前{number}大数据示例
            gameTwo.find().sort({ score: -1 }).skip(0).limit(data.number).exec((err, response) => {
                if (err) next({ status: errorcode.GET_RANK_ERR_2, msg: '查找排行榜错误' })
                res.send({ status: 0, msg: '操作成功', data: response })
            })
        }
    }
}

module.exports = apis
