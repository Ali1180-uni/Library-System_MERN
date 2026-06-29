import mongoose from 'mongoose';
import { Book, User } from './model.js'; // Make sure path matches your models file
import dotenv from 'dotenv';
dotenv.config({
  path: '../.env'
});

const seedDatabase = async () => {
  try {
    // 1. Establish database link
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for data seeding...');

    // 2. Wipe previous data to prevent duplicate unique key errors
    // await User.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing Users and Books data.');

    // 3. Define Seed Books catalog
    const dummyBooks = [
      {
        id: "BK-101",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        Image: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
        Description: "A story of the mysteriously wealthy Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
        isAvailable: true
      },
      {
        id: "BK-102",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        Image: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
        Description: "A deeply moving story about racial injustice and the destruction of innocence in the American South.",
        isAvailable: true
      },
      {
        id: "BK-103",
        title: "1984",
        author: "George Orwell",
        Image: "https://covers.openlibrary.org/b/id/7222247-M.jpg",
        Description: "A dystopian novel about totalitarianism, surveillance, and the destruction of individual freedom.",
        isAvailable: true
      },
      {
        id: "BK-104",
        title: "The Alchemist",
        author: "Paulo Coelho",
        Image: "https://covers.openlibrary.org/b/id/8108691-M.jpg",
        Description: "A philosophical novel about a young shepherd's journey to find treasure and his personal legend.",
        isAvailable: true
      },
      {
        id: "BK-105",
        title: "Brave New World",
        author: "Aldous Huxley",
        Image: "https://covers.openlibrary.org/b/id/8775110-M.jpg",
        Description: "A futuristic society where humans are engineered and conditioned to maintain social stability.",
        isAvailable: true
      },
      {
        id: "BK-106",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        Image: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
        Description: "A story of teenage alienation and loss of innocence through the eyes of Holden Caulfield.",
        isAvailable: true
      },
      {
        id: "BK-107",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        Image: "https://covers.openlibrary.org/b/id/8091016-M.jpg",
        Description: "A romantic novel about manners, marriage, and society in early 19th century England.",
        isAvailable: true
      },
      {
        id: "BK-108",
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        Image: "https://covers.openlibrary.org/b/id/240728-M.jpg",
        Description: "A comedic science fiction series following Arthur Dent after Earth is demolished for a bypass.",
        isAvailable: true
      }
    ];


    // Save books to obtain generated MongoDB ObjectIds
    const insertedBooks = await Book.insertMany(dummyBooks);
    console.log(`Successfully added ${insertedBooks.length} books.`);

    // 4. Define Seed Users (Guarantees exactly one Admin)
    // const dummyUsers = [
    //   {
    //     name: "System Administrator",
    //     email: "admin@library.com",
    //     username: "superadmin",
    //     password: "securepassword123", // In actual routes, apply bcrypt hashing here
    //     StudentID: "ST-ADMIN01",
    //     role: "Admin",
    //     borrowedBooks: [] // Admins start clean
    //   },
    //   {
    //     name: "Jane Doe",
    //     email: "jane.doe@student.com",
    //     username: "janedoe99",
    //     password: "studentpassword123",
    //     StudentID: "ST-2026-001",
    //     role: "Student",
    //     // Pre-link Jane to automatically borrow "The Great Gatsby" for testing
    //     borrowedBooks: [insertedBooks[0]._id] 
    //   },
    //   {
    //     name: "John Smith",
    //     email: "john.smith@student.com",
    //     username: "jsmith88",
    //     password: "studentpassword456",
    //     StudentID: "ST-2026-002",
    //     role: "Student",
    //     borrowedBooks: []
    //   }
    // ];

    // Mark the first book as borrowed since it was assigned to Jane above
    await Book.findByIdAndUpdate(insertedBooks[0]._id, { isAvailable: false });

    // await User.insertMany(dummyUsers);
    // console.log('Successfully configured 1 Admin and 2 Student test accounts.');

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