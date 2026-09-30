const express = require('express')
const bodyParser = require('body-parser')
const MobileController = require('../controllers/MobileController')
const route = express.Router();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: false
}));
route.post('/add/mobile', (req, res) => {
    MobileController.addMobile(req,res)
})
route.get('/mobiles', (req, res) => {
    MobileController.getMobiles(req, res)
})
route.delete('/delete/mobile/:id', (req, res) => {
    MobileController.deleteMobile(req, res)
})
route.get('/mobile/for/edit/:id', (req, res) => {
    MobileController.getMobileForEdit(req, res)
})
route.put('/edit/mobile/:id', (req, res) => {
    MobileController.editMobile(req, res)
})
module.exports = route;