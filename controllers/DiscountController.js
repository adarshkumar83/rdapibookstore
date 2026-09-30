const { Error } = require('mongoose')
const Book = require('../models/Book')
const Discount = require('../models/Discount')

async function getBooks(req, res) {
    try {
        // select _id, bookTitle from Book => in my sql
        let books = await Book.find({},{_id: 1, bookTitle: 1 }) // in mongodb
        res.status(200).send({ data: books})
    } catch (err) {
        res.status(400).send({ message: 'something went wrong'})
    }
}

async function addDiscount(req, res) {
    try {
        let discount = new Discount(req.body)
        await discount.save()
        res.status(200).send({ message: 'Discount added Successfully...'})
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}
async function getDiscounts(req, res) {
    try {
        let discounts = await Discount.find({}).populate('book')
        // console.log(discounts);
        res.status(200).send({ data: discounts})
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong'});
    }
}
async function getDiscountForEdit(req, res) {
    try {
        let id = req.params.id;
        let discount = await Discount.findById(id)
        let books = await Book.find({});
        console.log(discount)
        res.status(200).send({ data: discount, books: books})
    } catch (err) {
        res.status(400).send({ message: err})
    }
}
async function editDiscount(req, res) {
    try {
        let id = req.params.id;
        await Discount.updateOne({_id: id}, req.body)
        console.log("Data has been updated successfully..")
        res.status(200).send({ message: 'Data Inserted successfully'})
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'Something went wrong'})
    }
}

module.exports = {
    getBooks,
    addDiscount,
    getDiscounts,
    getDiscountForEdit,
    editDiscount
}