const mongoose = require('mongoose');

// Book Schema
const BookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    Image: { type: String, required: true },
    author: { type: String, required: true },
    Description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true } // Keeps track of stock
});

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    StudentID: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Admin', 'Student'], default: 'Student' },
    // Array of Book ObjectIds to track borrowed books
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const Book = mongoose.model('Book', BookSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Book, User };
