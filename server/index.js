const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const {User} = require('./models/User')
const {auth} = require('./middleware/auth')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false   
}).then(()=>console.log('mongoDB connected...'))
    .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! Re?')
})

app.post('/api/register', (req,res)=>{
    const user = new User(req.body)
    user.save((err, userInfo)=>{
      if(err) return res.json({success:false, err})
      return res.status(200).json({
        success:true
    })
  })   
}) 
app.post('/api/login', (req, res)=>{
  User.findOne({email : req.body.email}, (err, user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message: "입력된 이메일과 일치하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({
        loginSuccess:false, message:"비밀번호가 틀렸습니다."
      })
    })

    user.generateToken((err, user)=>{
      if(err) return res.status(400).send(err)
        res.cookie('x_auth', user.token)
        .status(200)
        .json({
          loginSuccess : true,
          userId: user._id
        })
    })
  })
})

app.get('/api/auth', auth, (req, res)=> {
	res.status(200).json({
	_id: req.user._id,
	isAdmin: req.user.role === 0? false : true,
	isAuth: true,
	email: req.user.email,
	name: req.user.name,
	role: req.user.role,
	image: req.user.image
	})
})

app.get('/api/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id : req.user._id},
    {token:""}
    ,(err, user)=>{
      if(err) return res.json({success:false, err})
      return res.status(200).send({
        success:true
      })
  })
})

app.get('/api/hello', (req, res) => {
  res.send(`Hello World!`)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})