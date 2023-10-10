const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Post} = require('../models/models')
//const {User} = require('../migrations/20231010094628-Create-User-Table')

const generateJWT = (id,email,role) => {
    return jwt.sign(
        {id,email,role}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController {
    async registration (req,res,next) {
        const {email,password,role} = req.body
        console.log(email,password)
        if (!email||!password ){
            return next(ApiError.badRequest('Не корректный email или password'))
        }
        const condidat = await User.findOne({where:{email}})
        if (condidat) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password:hashPassword})
        const token = generateJWT(user.id, user.email,user.role)

        return res.json({token})
        //res.json(id)
    }
    async login (req,res,next) {
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJWT(user.id,user.email,user.role)
        return res.json({token})
    }
    async check (req,res,next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()