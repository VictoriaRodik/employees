#Contracts and Cash Orders
A web application for creating, saving, and printing ЦПХ (civil law) contracts and cash expenditure orders. Suitable for small organizations working with temporary employees.

🔗 https://print-for-employees.onrender.com

⚙️ Features:
📄 Generation of contracts
💵 Printing of cash expenditure orders
🧑‍💼 Storage of employee and organization information
🔍 Search and sort employees
✏️ Create, edit, copy, and delete records

🛠️ Tech Stack
Frontend: React, React Query, Material UI
Backend: Node.js (Express)
Database: MySQL
Deployment: Render (backend + frontend) / Aiven (DB)

📦 Local Setup
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
backend/.env:
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=5000

frontend/.env:
VITE_API_URL=http://localhost:5000

4. Run the application:

# In one terminal, run the backend
cd backend
npm run dev

# In another terminal, run the frontend
cd frontend
npm run dev
The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.

📁 Folder Structure
your-repo-name/
├── frontend/        # React frontend
├── backend/        # Express backend
└── README.md

✨ Future Plans:
- Add user authentication and roles
- Generate HR orders (hiring, dismissal, leave, bonuses, etc.)

📬 Feedback & Contributions
Feel free to fork the project, submit pull requests, or suggest improvements through issues.
