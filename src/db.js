//引入模块
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://username:password@ip:port/minigame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
}, function (err) {
    if (err) console.log(err);
})

const db = mongoose.connection;

db.once('open', () => {
    // 测试数据库连接是否成功
    console.log('mongoose connect success')
})
