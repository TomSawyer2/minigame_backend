var errorcode = require('../common/config.js').errorcode;

const apis = {
    test(req, res, next) {
        // next({ status: errorcode.FAILED, msg: '未知错误' }); // 此处为抛出错误示例
        res.send({ status: 0, msg: 'Hello World For Game1', data: null }); // 此处为正常返回请求示例
    },
    updateInfo(req, res, next) {
        console.log(req.body); // 从POST请求获取数据的示例
        res.send({ status: 0, msg: '操作成功', data: null });
    }
}

module.exports = apis
