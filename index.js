// ==============================================================================
// MAIN SERVER ENTRY POINT (index.js)
// ==============================================================================
// This file initializes Express, connects to MongoDB Atlas using Mongoose,
// registers essential middlewares, and mounts the API routes.

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicle.route');

// 1. Load environment variables from .env file
dotenv.config();

// 2. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ------------------------------------------------------------------------------
// MIDDLEWARE CONFIGURATION
// ------------------------------------------------------------------------------
// Middleware functions execute during the request-response lifecycle.

// Parse incoming requests with JSON payloads (req.body)
app.use(express.json());

// Parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets (HTML, CSS, images) from the 'public' directory
// Visiting http://localhost:3000 will automatically serve public/index.html
app.use(express.static('public'));

// ------------------------------------------------------------------------------
// ROUTE MOUNTING
// ------------------------------------------------------------------------------
// Mount all vehicle CRUD endpoints under the '/api/vehicles' prefix
app.use('/api/vehicles', vehicleRoutes);

// Health check endpoint (useful for quick server status check)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is running', timestamp: new Date() });
});

// ------------------------------------------------------------------------------
// DATABASE CONNECTION & SERVER STARTUP
// ------------------------------------------------------------------------------
// Connect to MongoDB Atlas first; start listening for requests only on success.
if (!MONGO_URI || MONGO_URI.includes('<username>')) {
    console.warn('\n============================================================');
    console.warn('⚠️  WARNING: MONGO_URI in .env is not yet configured with real credentials!');
    console.warn('   Please update .env with your MongoDB Atlas connection string.');
    console.warn('============================================================\n');
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected successfully to MongoDB Atlas database!');
        // Start Express server after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on: http://localhost:${PORT}`);
            console.log(`🌐 Dashboard UI accessible at: http://localhost:${PORT}`);
            console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api/vehicles`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB Atlas connection error:', error.message);
        console.log('\n💡 Starting server in offline mode so frontend can still load...');
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on http://localhost:${PORT} (Waiting for valid MongoDB connection)`);
        });
    });
