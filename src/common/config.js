module.exports = {
    errorcode: {
        FAILED: -1, // 未知错误，一般不会出现
        // game1
        UPDATE_ERR_1: 100, // 更新成绩失败
        GET_RANK_ERR_1: 101, // 查找排行榜错误
        TIMEOUT_1: 102, // 没有相关登录信息
        TOKEN_USED_1: 103, // token已使用
        LOGIN_ERR_1: 104, // 登录错误
        // game2
        UPDATE_ERR_2: 200, // 更新成绩失败
        GET_RANK_ERR_2: 201 // 查找排行榜错误
    }
}
