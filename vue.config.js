const Express = require('express')
const goods = require('./data/goods.json')
const ratings = require('./data/ratings.json')
const seller = require('./data/seller.json')

const app = Express();

module.exports = {
    devServer: {
        before: app => {
            app.get('/api/goods', (req,res) =>{
                res.json(goods)
            })
            app.get('/api/ratings', (req,res) =>{
                res.json(ratings)
            })
            app.get('/api/seller', (req,res) =>{
                res.json(seller)
            })
        }
    },
}