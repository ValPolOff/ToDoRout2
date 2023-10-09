const {Post} = require('../models/models')
//const {Post} = require('../migrations/20231005190030-Create-Post-Table')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class PostController {
    async create (req,res) {
        const {text,completed} = req.body
        const post = await Post.create({text,completed})
        return res.json(post)
    }
    async getAll (req,res) {
        const post = await Post.findAll()
        return res.json(post)
    }
    async delete (req,res) {
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
        let {sort, limit, page} = req.query
        //const [limit, page] = req.query
        page = page || 1
        limit = limit || 5
        let offset = page*limit-limit
        //const post;
        sort === 'true' ? res.json(await Post.findAndCountAll({where:{completed:true}, limit,offset})) : 
        sort === 'false' ? res.json(await Post.findAndCountAll({where:{completed:false}, limit,offset})) : 
        sort === "ASC" ? res.json(await Post.findAndCountAll({where:{},order:[["createdAt",'ASC']], limit,offset})) :
        sort === "DESC" ? res.json(await Post.findAndCountAll({where:{},order:[["createdAt",'DESC']], limit,offset})) :
        sort === "Today" ? res.json(await Post.findAndCountAll({
            where:{
            createdAt : {
                [Op.gt]:new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + (new Date().getUTCDate().toString() <= '9' ? '0' + new Date().getUTCDate().toString():new Date().getUTCDate().toString()),}},limit,offset
            })) : 
        res.json(await Post.findAndCountAll({limit,offset}));
        //new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + new Date().getUTCDate().toString() + 'T'+ new Date().getUTCHours().toString() + '-'+ new Date().getUTCMinutes().toString() + '-' + new Date().getUTCMilliseconds().toString() + 'Z'
        //return res.json(post)
        console.log(new Date().getFullYear().toString() + '-' + (new Date().getUTCMonth()+1).toString() + '-' + (new Date().getUTCDate().toString() <= '9' ? '0' + new Date().getUTCDate().toString():new Date().getUTCDate().toString()))
    }
}

module.exports = new PostController()