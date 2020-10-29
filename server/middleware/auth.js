const {User} = require('../models/User')

let auth = (req, res, next) => {
    // 인증처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth

    // 쿠키의 토큰을 복호화 한 뒤 서버에서 유저를 찾음
    User.findByToken(token, (err, user) => {
        // 유저가 없으면 인증 No
        if(err) throw err
        if(!user) return res.json({
            isAuth: false,
            error: true
        })
        // 유저가 있으면 인증 OKAY
        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }