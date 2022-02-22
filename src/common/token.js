var jwt = require('jsonwebtoken');
var jwtScrect = 'minigame_backend';  //签名

//登录接口 生成token的方法
var setToken = function () {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        //expiresln 设置token过期的时间
        //{ user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
        const token = jwt.sign({ time: new Date().getTime() }, jwtScrect, { expiresIn: '1h' });
        resolve(token)
    })
}
//各个接口需要验证token的方法
var getToken = function (token) {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, jwtScrect);
        resolve(info);  //解析返回的值（sign 传入的值）
    })
}

module.exports = {
    setToken,
    getToken
}
