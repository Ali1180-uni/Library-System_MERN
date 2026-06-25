# 📚 Library Management System (MERN Stack)

A full-stack Library Management System built using the **MERN** (MongoDB, Express.js, React, Node.js) architecture. This application provides an efficient way for librarians to manage books, authors, and members while allowing users to borrow, return, and search for books online.

---

## 🚀 Features

### 👤 User & Member App
* **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
* **Book Catalog:** Browse available books with advanced filtering and search functionality.
* **Borrowing History:** Track currently borrowed books, due dates, and fine overviews.
* **Profile Management:** Update personal information and view membership status.

### ⚙️ Admin & Librarian Dashboard
* **Inventory Management:** Complete CRUD operations for books, copies, categories, and authors.
* **Borrow Tracking:** Process book issuance, returns, and track overdue items.
* **Member Management:** Approve new memberships, view logs, and issue fines.
* **Data Insights:** High-level dashboard statistics showcasing total books, active borrows, and members.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router, HTML5, CSS3 / Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org) (v16+ recommended)
* [MongoDB Atlas](https://mongodb.com) account or a local MongoDB community server instance.

### 1. Clone the Repository
```bash
git clone https://github.com/Ali1180-uni/Library-System_MERN.git
cd Library-System_MERN
```

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend` directory and populate it with your environment configurations:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm start
   ```
   *The server should now be running on `http://localhost:5000`*

### 3. Frontend Configuration
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd Library
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   *The application will open automatically in your browser at `http://localhost:3000`*

---

## 🔒 API Endpoints Preview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | No |
| **POST** | `/api/auth/login` | Login user & return JWT token | No |
| **GET** | `/api/books` | Get all books | No |
| **POST** | `/api/books` | Add a new book | Yes (Admin) |
| **POST** | `/api/borrow` | Issue a book to a member | Yes (Admin) |
| **PUT** | `/api/borrow/return/:id` | Process a book return | Yes (Admin) |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---