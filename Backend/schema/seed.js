import mongoose from 'mongoose';
import { Book, User }  from './model.js'; // Make sure path matches your models file
import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
});

const seedDatabase = async () => {
  try {
    // 1. Establish database link
    await mongoose.connect("process.env.MONGODB_URI");
    console.log('Connected to MongoDB for data seeding...');

    // 2. Wipe previous data to prevent duplicate unique key errors
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing Users and Books data.');

    // 3. Define Seed Books catalog
    const dummyBooks = [
      {
        id: "BK-101",
        title: "The Great Gatsby",
        Image: "https://example.com",
        author: "F. Scott Fitzgerald",
        Description: "A classic novel exploring themes of wealth, love, and the American Dream in the 1920s.",
        isAvailable: true
      },
      {
        id: "BK-102",
        title: "To Kill a Mockingbird",
        Image: "https://example.com",
        author: "Harper Lee",
        Description: "A deeply moving story about racial injustice and the destruction of innocence in the American South.",
        isAvailable: true
      },
      {
        id: "BK-103",
        title: "1984",
        Image: "https://example.com",
        author: "George Orwell",
        Description: "A dystopian social science fiction novel focusing on totalitarianism and mass surveillance.",
        isAvailable: true
      }
    ];

    // Save books to obtain generated MongoDB ObjectIds
    const insertedBooks = await Book.insertMany(dummyBooks);
    console.log(`Successfully added ${insertedBooks.length} books.`);

    // 4. Define Seed Users (Guarantees exactly one Admin)
    const dummyUsers = [
      {
        name: "System Administrator",
        email: "admin@library.com",
        username: "superadmin",
        password: "securepassword123", // In actual routes, apply bcrypt hashing here
        StudentID: "ST-ADMIN01",
        role: "Admin",
        borrowedBooks: [] // Admins start clean
      },
      {
        name: "Jane Doe",
        email: "jane.doe@student.com",
        username: "janedoe99",
        password: "studentpassword123",
        StudentID: "ST-2026-001",
        role: "Student",
        // Pre-link Jane to automatically borrow "The Great Gatsby" for testing
        borrowedBooks: [insertedBooks[0]._id] 
      },
      {
        name: "John Smith",
        email: "john.smith@student.com",
        username: "jsmith88",
        password: "studentpassword456",
        StudentID: "ST-2026-002",
        role: "Student",
        borrowedBooks: []
      }
    ];

    // Mark the first book as borrowed since it was assigned to Jane above
    await Book.findByIdAndUpdate(insertedBooks[0]._id, { isAvailable: false });

    await User.insertMany(dummyUsers);
    console.log('Successfully configured 1 Admin and 2 Student test accounts.');

    // 5. Terminate process cleanly
    mongoose.connection.close();
    console.log('Seeding task finalized. Database connection closed.');

  } catch (error) {
    console.error('Data seeding failed error details:', error);
    mongoose.connection.close();
  }
};

// Execute seed operation
seedDatabase();