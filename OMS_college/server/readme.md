# ConnectU

ConnectU is a web-based platform that helps students discover and apply for opportunities such as internships, scholarships, competitions, and events. The platform allows administrators to post and manage opportunities while students can explore and access application links easily.

The system is designed to provide a centralized and organized way to share academic and professional opportunities among students.

---

## 🚀 Features

### Student Features

* Register and login to the platform
* Browse available opportunities
* Filter opportunities based on categories
* Access external application links
* Submit feedback after opportunity deadline

### Admin Features

* Secure admin login
* Create new opportunities
* Update existing opportunities
* Delete opportunities
* Manage only their own posted opportunities

---

## ⚙️ Functional Requirements

1. The system allows students to register and log in.
2. The system supports role-based access for students and admins.
3. Admins can create, update, and delete opportunities.
4. Admins can manage only their own posts.
5. Students can view and filter opportunities.
6. Students are redirected to external application links.
7. Opportunities automatically close after the deadline.
8. Students can submit feedback after opportunity closure.

---

## 🔒 Non-Functional Requirements

* Secure authentication and authorization
* Fast system response time
* Scalable and reliable architecture
* Data integrity and privacy protection
* Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

### File Upload

* Multer
* Cloudinary

---

## 📂 Project Structure (Simplified)

```
ConnectU
│
├── client (Frontend - React)
│   ├── components
│   ├── pages
│   └── services
│
├── server (Backend - Node.js)
│   ├── controllers
│   ├── routes
│   ├── models
│   └── middleware
│
└── README.md
```

---

## 🔑 Authentication

The system uses **JWT-based authentication** to securely manage user sessions and protect restricted routes.

---

## 📊 System Overview

ConnectU follows a **client-server architecture**:

1. React frontend handles the user interface.
2. Node.js + Express.js manage backend APIs.
3. MongoDB stores application data.
4. JWT handles authentication.
5. Multer and Cloudinary manage image uploads.

---

## 📌 Future Improvements

* Notification system for new opportunities
* Email alerts for deadlines
* Advanced filtering and search
* Analytics dashboard for admins

---

## 👨‍💻 Author

Developed as an academic project to demonstrate full-stack web development using the MERN stack.
