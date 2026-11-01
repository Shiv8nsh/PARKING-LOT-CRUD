# 🚗 Parking Lot & Vehicle Fee CRUD System

A beginner-friendly, evaluation-ready full-stack CRUD web application built with **Node.js**, **Express.js**, **MongoDB Atlas (Mongoose ODM)**, and pure **HTML & CSS**.

---

## 📁 Project Architecture (MVC Pattern)

```text
parking-calculator/
├── models/
│   └── vehicle.model.js       # Mongoose Schema & Model definition
├── controllers/
│   └── vehicle.controller.js  # Business logic for all 5 CRUD operations
├── routes/
│   └── vehicle.route.js       # Express Router mapping HTTP verbs to controllers
├── public/
│   ├── index.html             # Pure HTML dashboard with minimal inline fetch calls
│   └── style.css              # Clean, modern, responsive pure CSS styling
├── .env                       # Environment variables (MONGO_URI and PORT)
├── .gitignore                 # Excludes node_modules and .env from Git
├── index.js                   # Server entry point, middleware, DB connection
├── package.json               # Project metadata and dependencies
└── README.md                  # Setup, Postman test guide & evaluation cheat-sheet
```

---

## 🛠️ Tech Stack & Constraints
- **Backend**: Node.js & Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Frontend**: Pure HTML5 & CSS3 (served via `express.static('public')`, no React/Bootstrap/Tailwind)
- **Architecture**: Model-View-Controller (MVC)

---

## 🚀 Step 1: MongoDB Atlas Setup & `.env` Configuration

1. **Sign Up / Sign In**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and log in.
2. **Create a Free Cluster**: Choose the free **M0 Sandbox** cluster.
3. **Create Database User**:
   - Go to **Database Access** (left menu) -> **Add New Database User**.
   - Select **Password** authentication.
   - Set a username (e.g. `admin`) and a password (e.g. `admin123`).
   - Assign user privileges: **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access**:
   - Go to **Network Access** (left menu) -> **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) -> Click **Confirm**.
5. **Get Connection String**:
   - Go to **Database** -> Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It looks like:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
6. **Update `.env`**:
   - Open `.env` in this project.
   - Replace `<username>` and `<password>` with your database user credentials.
   - Specify database name `parkingDB` before `?retryWrites=true`:
     ```env
     PORT=3000
     MONGO_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/parkingDB?retryWrites=true&w=majority
     ```

---

## 💻 Step 2: Running the Project

1. **Install dependencies** (if setting up on a new machine):
   ```bash
   npm install
   ```

2. **Start the application**:
   - **Production mode**:
     ```bash
     npm start
     ```
   - **Development mode (with auto-restart)**:
     ```bash
     npm run dev
     ```

3. **Access the Dashboard**:
   - Open your browser and navigate to:
     ```text
     http://localhost:3000
     ```

---

## 📬 Step 3: Postman Desktop Testing Guide

Follow these exact steps to test all 5 CRUD operations in Postman:

### 1. CREATE (`POST /api/vehicles`)
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/vehicles`
- **Headers**:
  - Key: `Content-Type`, Value: `application/json`
- **Body**: Select `raw` -> `JSON`, and paste:
  ```json
  {
    "vehicleNumber": "HR-26-AB-1234",
    "vehicleType": "Car",
    "ownerName": "Rahul Sharma",
    "parkingFee": 50,
    "status": "Parked"
  }
  ```
- **Expected Response**: Status `201 Created` with the saved document including `_id`. *Copy the `_id` for following steps.*

---

### 2. READ ALL (`GET /api/vehicles`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/vehicles`
- **Headers**: *(None required)*
- **Expected Response**: Status `200 OK` with a JSON array of all registered vehicles.

---

### 3. READ ONE (`GET /api/vehicles/:id`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/vehicles/<paste_copied_id_here>`
  - *Example*: `http://localhost:3000/api/vehicles/66382...`
- **Headers**: *(None required)*
- **Expected Response**: Status `200 OK` with the specific vehicle object.

---

### 4. UPDATE (`PUT /api/vehicles/:id`)
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/vehicles/<paste_copied_id_here>`
- **Headers**:
  - Key: `Content-Type`, Value: `application/json`
- **Body**: Select `raw` -> `JSON`, and paste:
  ```json
  {
    "status": "Exited",
    "parkingFee": 50
  }
  ```
- **Expected Response**: Status `200 OK` with the updated vehicle document.

---

### 5. DELETE (`DELETE /api/vehicles/:id`)
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/vehicles/<paste_copied_id_here>`
- **Headers**: *(None required)*
- **Expected Response**: Status `200 OK` with:
  ```json
  {
    "message": "Vehicle deleted successfully",
    "deletedVehicle": { ... }
  }
  ```

---

## 🐙 Step 4: Push to Public GitHub Repository

Run these exact terminal commands inside the project folder:

```bash
# 1. Stage all project files (node_modules and .env are safely ignored)
git add .

# 2. Commit the changes
git commit -m "Complete Parking Lot CRUD System for evaluation"

# 3. Rename branch to main
git branch -M main

# 4. Link your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push code to GitHub
git push -u origin main
```

---

## 🎓 Viva / Evaluation Q&A Cheat-Sheet

| Question | Answer for Examiner |
| :--- | :--- |
| **What is MVC?** | MVC separates concerns: **Model** (`vehicle.model.js`) handles data structure and DB operations; **View** (`index.html`) handles UI presentation; **Controller** (`vehicle.controller.js`) handles business logic between Model and View. |
| **Why `express.json()`?** | Built-in Express middleware that parses incoming requests with JSON payloads and populates `req.body`. |
| **Why `express.static('public')`?** | Serves static assets directly (HTML, CSS, client JS) so visiting `http://localhost:3000` loads `public/index.html`. |
| **What do `{ new: true, runValidators: true }` do in `findByIdAndUpdate`?** | `{ new: true }` returns the modified document rather than the original; `{ runValidators: true }` enforces schema validation rules on updates. |
| **What does `timestamps: true` do?** | Automatically creates and manages `createdAt` and `updatedAt` date fields on MongoDB documents. |
