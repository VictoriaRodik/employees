#Contracts and Cash Orders
A web application for creating, saving, and printing ЦПХ (civil law) contracts and cash expenditure orders. Suitable for small organizations working with temporary employees.

🔗 https://print-for-employees.onrender.com

user: test
password: test

#⚙️ Features:
📄 Generation of contracts
💵 Printing of cash expenditure orders
🧑‍💼 Storage of employee and organization information
🔍 Search and sort employees
✏️ Create, edit, copy, and delete records

#🛠️ Tech Stack
Frontend: React, React Query, Material UI
Backend: Node.js (Express)
Database: MySQL
Deployment: Render (backend + frontend) / Aiven (DB)

#📦 Local Setup
To run the project locally, you need Node.js and MySQL installed.

1. Clone the repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies for both frontend and backend:
cd backend
npm install

cd ../frontend
npm install
3. Set up your .env files:

Refer to .env.example for the required environment variables.

4. Run the application:

In one terminal, run the backend
cd backend
npm run dev

In another terminal, run the frontend
cd frontend
npm run dev
The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.

#📁 Folder Structure

employees/
├── backend/                # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── app.js              # Express app setup
├── frontend/               # React frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   └── App.js              # Main React component
├── .env.example            # Example environment variables
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation


#✨ Future Plans:
- Generate HR orders (hiring, dismissal, leave, bonuses, etc.)

#📬 Feedback & Contributions
Feel free to fork the project, submit pull requests, or suggest improvements through issues.
