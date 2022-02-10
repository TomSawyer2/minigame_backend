var errorcode = require('../common/config.js').errorcode;

const apis = {
    test(req, res, next) {
        next({ status: errorcode.FAILED, msg: '未知错误' }); // 此处为抛出错误示例
    }
}

module.exports = apis
