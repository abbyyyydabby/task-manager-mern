# 🗂️ Full-Stack MERN Task Manager

A complete **Full-Stack MERN Task Management Application** built to efficiently manage tasks, track progress, and enable seamless team collaboration.  
Designed with a **modern UI**, **robust backend**, and **real-world workflows** in mind.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Icons
- Moment.js

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Multer (file uploads)

---

## ✨ Functionalities Implemented

### 1️⃣ User Dashboard
- View all assigned tasks at a glance  
- Visual insights into **Pending**, **In Progress**, and **Completed** tasks  
- Priority and status distribution charts  

---

### 2️⃣ Task Management
- Create, view, update, and manage tasks  
- Set **due dates**, **priorities**, and **descriptions**  
- Separate flows for **Admin** and **User**

---

### 3️⃣ Automated Status Updates
- Task status updates **automatically** based on checklist completion:
  - Empty checklist → **Pending**
  - Partially completed → **In Progress**
  - Fully completed → **Completed**

---

### 4️⃣ Team Collaboration
- Assign tasks to **multiple users**
- View assigned members using avatar groups
- Track individual task responsibility

---

### 5️⃣ Priority & Progress Tracking
- Tasks categorized as **Low**, **Medium**, or **High Priority**
- Real-time progress tracking using todo checklists
- Visual progress indicators

---

### 6️⃣ Task Report Downloads
- Generate and download task reports
- Useful for tracking, auditing, and productivity analysis

---

### 7️⃣ Attachments Support
- Add external links or references to tasks
- Click to open attachments directly in the browser

---

### 8️⃣ Mobile Responsive UI
- Fully responsive design
- Optimized for **desktop**, **tablet**, and **mobile**
- Smooth and consistent user experience across devices

---

## 🔐 Authentication & Authorization
- Secure JWT-based authentication




🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/abbyyyydabby/task-manager-mern.git
cd task-manager-mern

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend/Task-Manager
npm install
npm run dev

🌐 Environment Variables

Create a .env file in the backend directory:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📌 Future Enhancements

Email notifications

Role-based task approvals

Drag-and-drop task boards

Real-time updates using WebSockets

👨‍💻 Author

Abhinav (abbyyyydabby)
GitHub: https://github.com/abbyyyydabby

⭐ Final Note

This project demonstrates real-world MERN stack architecture, clean component design, API integration, and scalable task workflows — making it ideal for production use and portfolio showcase.

If you like it, don’t forget to ⭐ the repo!
- Protected routes for users and admins
- Role-based access control
