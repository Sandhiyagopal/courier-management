Courier Management System – Full Stack Project

A complete Courier Management System with role-based access (Admin / Staff / Public user). Built with React (Tailwind CSS) frontend, Node.js + Express backend, MySQL database, and JWT authentication.

Features

Admin Panel
- Dashboard with statistics (total couriers, staff, branches, complaints)
- Branch Management – add / edit / delete branches
- Staff Management – add / edit / delete staff members
- Courier Management – view all couriers, tracking history
- Complaint Management – view open complaints, resolve with remark
- Enquiry Management – view user enquiries
- Page Management – edit "About Us" and "Contact Us" pages
- Reports – date-wise courier lists, request count, sales summary

Staff Panel
- Dashboard – list of new couriers (status = Booked)
- Add Courier – book a new parcel (sender/recipient details)
- Update Status – change courier status (pickup, shipped, in-transit, delivered, etc.)
- Search Courier – search by reference number
- View Details – see full courier info + tracking history

Public (User) Pages
- Track Courier – enter reference number to see real-time status and history
- Branches – view all courier branches
- About Us – company information (editable by admin)
- Complaints – raise a complaint against a courier, check status with ticket number
- Contact – send enquiry to admin

Security
- JWT authentication
- bcrypt password hashing
- Role-based routes (Admin / Staff)

Tech Stack

- Frontend: React 18, React Router, Axios, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express.js, JSON Web Token, bcryptjs, MySQL2
- Database: MySQL (RDBMS)
- Dev Tools: Vite (frontend), Nodemon (backend), Git

Project Structure


courier-management-system/
├── backend/
│   ├── config/            # Database connection
│   ├── controllers/       # Auth, admin, staff, reports, etc.
│   ├── middleware/        # JWT auth, role check
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Layouts, Sidebars, Loader, PrivateRoute
│   │   ├── context/       # AuthContext (JWT management)
│   │   ├── pages/
│   │   │   ├── admin/     # AdminDashboard, ManageBranches, ManageStaff, Reports, etc.
│   │   │   ├── staff/     # StaffDashboard, AddCourier, UpdateStatus, SearchCourier
│   │   │   └── user/      # TrackCourier, Branches, AboutUs, Complaints, Contact
│   │   ├── services/      # Axios instance with interceptors
│   │   ├── App.jsx
│   │   └── index.css      # Tailwind directives
│   ├── .env
│   ├── vite.config.js     # Proxy configuration
│   └── package.json
└── database/
    └── cmsdb.sql          # Full database schema with sample data


 Installation & Setup

1. Clone the repository
   git clone https://github.com/your-username/courier-management-system.git
   cd courier-management-system

2. Database Setup
   - Create a MySQL database (e.g., `cmsdb`)
   - Import the schema from `database/cmsdb.sql`
   - Update `.env` file in the `backend/` folder with your database credentials.

   Example admin user (password = admin123):
   INSERT INTO tbladmin (AdminName, UserName, MobileNumber, Email, Password) 
   VALUES ('Super Admin', 'admin@courier.com', '9999999999', 'admin@courier.com', '$2b$10$...');

3. Backend Setup
   cd backend
   npm install
   cp .env.example .env   # create .env file with your values
   npm run dev
   Backend runs on `http://localhost:5001` (or port you set).

4. Frontend Setup
   cd frontend
   npm install
   npm run dev
   Frontend runs on `http://localhost:5173`.

 Default Login Credentials

- Admin: username `admin@courier.com`, password `admin123`
- Staff: created by admin, credentials as set.

 API Endpoints (Summary)

Auth
- POST `/api/auth/login` – Login (admin/staff)

Admin (requires JWT + role 'admin')
- GET `/api/admin/stats` – Dashboard numbers
- CRUD `/api/admin/branches` – Manage branches
- CRUD `/api/admin/staff` – Manage staff
- GET `/api/admin/couriers` – View all couriers
- GET `/api/admin/complaints` – View complaints
- PUT `/api/admin/complaints/:id/resolve` – Resolve complaint
- GET `/api/admin/enquiries` – View contact enquiries
- PUT `/api/admin/page/:type` – Update About/Contact pages
- GET `/api/admin/reports/couriers` – Courier report by date
- GET `/api/admin/reports/request-count` – Count of couriers/enquiries/complaints
- GET `/api/admin/reports/sales` – Sales summary by date

Staff (requires JWT + role 'staff')
- POST `/api/staff/courier` – Add new courier booking
- GET `/api/staff/new-couriers` – List couriers with status 'Booked'
- GET `/api/staff/courier/search?refNumber=` – Search by reference
- PUT `/api/staff/courier/:id/status` – Update courier status + tracking remark
- DELETE `/api/staff/courier/:id` – Delete courier
- GET `/api/staff/courier/:id` – Get full details + tracking history

Public (no authentication)
- GET `/api/track/:refNumber` – Track courier + history
- GET `/api/branches` – List all branches
- GET `/api/page/:type` – Get About Us / Contact Us page
- POST `/api/complaint` – Raise a complaint
- GET `/api/complaint-status/:ticketNo` – Check complaint status
- POST `/api/enquiry` – Send contact enquiry

 Testing

- Use Postman or curl to test backend APIs.
- Frontend testing: login as admin/staff, navigate through all modules.
- Check CORS – Vite proxy is configured to avoid CORS issues.

 Future Enhancements

- Online payment integration (Razorpay/Stripe)
- SMS/Email notifications on status change
- Mobile application (React Native)
- Live tracking on map
- PDF invoice generation

Contributing

Pull requests are welcome. For major changes, please open an issue first.

License

MIT

Author

Your Name – sandhiya.g@gmail.com

 Acknowledgements

- React, Tailwind CSS, Lucide Icons
- Node.js, Express, MySQL
- Vite, Nodemon

Happy Coding!
