const Book = require('../models/Book')
const cloudinary = require('cloudinary').v2
async function addBook(req, res) {
    try {
        cloudinary.config({
            cloud_name: "affrwxfc",
            api_key: "275575453528217",
            api_secret: "6eZKWavVr72RPuPWma1mQqZPoQE"
        })
        const upload = await cloudinary.uploader.upload(req.file.path)
        req.body.bookImage = upload.secure_url
        let book = new Book(req.body)
        await book.save();
        res.status(200).send({ message: 'Data has been saved successfully' })
    } catch (err) {
        res.status(400).send({ message: 'Something went wrong' })
    }
}
async function getBooks(req, res) {
    try {
        // let books = await Book.find({})
        // console.log(books)
        let totalBooks = await Book.countDocuments({})
        let books = await Book.find({ bookTitle: new RegExp(req.query.searchBook, "i") }).skip((req.query.pageNo - 1) * (req.query.booksPerPage)).limit(req.query.booksPerPage);
        res.status(200).send({ data: books, totalBooks: totalBooks })
    } catch (err) {
        res.status(400).send({ message: err })
    }
}
async function deleteBook(req, res) {
    try {
        let id = req.params.id;
        await Book.deleteOne({ _id: id });
        res.status(200).send({ success: true })
    } catch (err) {
        res.status(400).send({ success: false })
    }
}
async function getBookForEdit(req, res) {
    try {
        let id = req.params.id;
        let book = await Book.findOne({ _id: id });
        res.status(200).send({ data: book })
    } catch (err) {
        res.status(400).send({ data: err })
    }
}

async function editBook(req, res) {
    try {
        let id = req.params.id;
        let book = req.body
        await Book.updateOne({ _id: id }, req.body);
        console.log("Book updated successfully...")
        res.status(200).send({ success: true })
    } catch (err) {
        res.status(400).send({ success: false })
    }
}

module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    editBook
}