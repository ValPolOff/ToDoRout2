const {Post} = require('../models/models')
//const {Post} = require('../migrations/20231005190030-Create-Post-Table')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')
const jwt_decode = require('jwt-decode')
//const { response, request } = require('express')

class PostController {
    async create (req,res) {
        const {text,completed} = req.body
        const UserId1 = req.headers.authorization
        //console.log(UserId2.split(' '))
        const TakeJWT = UserId1.split(' ')
        //const J = jwt_decode(UserId2)
        console.log(TakeJWT[1])
        const J = jwt_decode(TakeJWT[1])
        console.log(J)
        //const {data} = req.query
        const post = await Post.create({text,completed,data:J.id})
        return res.json(post)
    }
    async delete (req,res) {
        //const UserId1 = req.headers.authorization
        const {id} = req.body
        const post = await Post.destroy({
            where:{id:id}
        })
        return res.json(post)
    }
    async update (req,res) {
        const {id} = req.body
        const post = await Post.update(req.body,{
            where:{id:id}
        })
        return res.json(post)
    }
    async filterComp (req,res) {
        const UserId1 = req.headers.authorization
        const TakeJWT = UserId1.split(' ')[1]
        const J = jwt_decode(TakeJWT)
        console.log(TakeJWT)
        let {sort, limit, page} = req.query
        //const [limit, page] = req.query
        page = page || 1
        limit = limit || 5
        let offset = page*limit-limit
        //const post;
        sort === 'true' ? res.json(await Post.findAndCountAll({where:{completed:true,data:J.id}, limit,offset})) : 
        sort === 'false' ? res.json(await Post.findAndCountAll({where:{completed:false,data:J.id}, limit,offset})) : 
        sort === "ASC" ? res.json(await Post.findAndCountAll({where:{data:J.id},order:[["createdAt",'ASC']], limit,offset})) :
        sort === "DESC" ? res.json(await Post.findAndCountAll({where:{data:J.id},order:[["createdAt",'DESC']], limit,offset})) :
        sort === "Today" ? res.json(await Post.findAndCountAll({
            where:{data:J.id,
            createdAt : {
                [Op.gt]:new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + (new Date().getUTCDate().toString() <= '9' ? '0' + new Date().getUTCDate().toString():new Date().getUTCDate().toString()),}},limit,offset
            })) : 
        res.json(await Post.findAndCountAll({where:{data:J.id},limit,offset}));
        //new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + new Date().getUTCDate().toString() + 'T'+ new Date().getUTCHours().toString() + '-'+ new Date().getUTCMinutes().toString() + '-' + new Date().getUTCMilliseconds().toString() + 'Z'
        //return res.json(post)
        console.log(new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + (new Date().getUTCDate().toString() <= '9' ? '0' + new Date().getUTCDate().toString():new Date().getUTCDate().toString()))
    }
}

module.exports = new PostController()