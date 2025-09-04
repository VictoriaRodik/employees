# Employees HR and Orders Management
A web app to manage HR reference data, contracts, and orders with PDF generation. Suitable for small and medium organizations working with temporary employees.

🔗 https://print-for-employees.onrender.com

Demo:
- user: test
- password: test

## ⚙️ Features
- Contracts and cash orders
  - Generate, preview and print contract and cash order PDFs
  - Contract/Order lists with actions (edit, copy, delete)
- HR reference data management
  - Employees, Organizations, Departments, Positions
  - Employment Types and Conditions
  - Qualification Grades and Grade Salaries
  - Work Schedules
  - Field Definitions and Reference Sources
- Orders module
  - Orders and Order Items with dynamic fields (text/number/date/reference)
  - Order settings
- Common UX
  - Search/sort, create/edit/copy/delete
  - Consistent tables and modals, confirmation dialogs
  - Authentication (login)

## 🛠️ Tech Stack
- Frontend: React + Vite + TypeScript, React Router, @tanstack/react-query, Material UI, Vitest + Testing Library
- Backend: Node.js (Express)
- Database: MySQL
- PDFs: React PDF renderer (custom components and fonts)
- Deployment: Render (frontend + backend), Aiven (DB)

## 📦 Local Setup
Requirements: Node.js (LTS), MySQL

1) Clone the repository
```
git clone <your-repo-url>
cd <your-repo-folder>
```

2) Install dependencies
```
cd backend
npm install

cd ../frontend
npm install
```

3) Configure environment
- Create `.env` files based on `.env.example` files (backend and frontend)
- Backend: DB connection (host, port, user, password, database)
- Frontend: API base URL

4) Run the app
```
# Terminal A
cd backend
npm run dev

# Terminal B
cd frontend
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

5) Run tests (frontend)
```
cd frontend
npm run test
```

## 📁 Folder Structure
```
employees/
├── backend/                       # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── middlewares/
│   └── server.js
├── frontend/                      # React frontend (Vite + TS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── pdf/               # PDF components (ContractPDF, CashOrderPDF)
│   │   │   ├── referenceSourceComponents/
│   │   │   ├── orderComponents/   # Orders tables/forms
│   │   │   ├── orderItemComponents/
│   │   │   ├── contractComponents/
│   │   │   ├── employeeComponents/
│   │   │   ├── ...
│   │   ├── hooks/                  # React Query hooks
│   │   ├── pages/                  # Route pages (Employees, Orders, etc.)
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/                  # formatters/mappers
│   │   └── tests/                  # Vitest + Testing Library
│   └── vite config, tsconfig, etc.
└── README.md
```

## ✨ Notes
- Dates are normalized to `YYYY-MM-DD` in UI lists and selects.
- Dynamic fields in Order Items support text/number/date/reference with validation.

## 📬 Feedback & Contributions
Issues and PRs are welcome.
