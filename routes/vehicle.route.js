// ==============================================================================
// VEHICLE ROUTES
// ==============================================================================
// In MVC architecture, "Routes" map incoming HTTP request paths and methods
// (POST, GET, PUT, DELETE) to their corresponding controller functions.

const express = require('express');
const router = express.Router();

// Import controller functions
const {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicle.controller');

// ------------------------------------------------------------------------------
// Route definitions for /api/vehicles
// ------------------------------------------------------------------------------

// 1. CREATE a new vehicle
// POST /api/vehicles
router.post('/', createVehicle);

// 2. READ ALL vehicles
// GET /api/vehicles
router.get('/', getAllVehicles);

// 3. READ ONE vehicle by ID
// GET /api/vehicles/:id
router.get('/:id', getVehicleById);

// 4. UPDATE vehicle by ID
// PUT /api/vehicles/:id
router.put('/:id', updateVehicle);

// 5. DELETE vehicle by ID
// DELETE /api/vehicles/:id
router.delete('/:id', deleteVehicle);

// Export router instance to be mounted in index.js
module.exports = router;
