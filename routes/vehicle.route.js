// Vehicle Routes
// Maps HTTP methods and URL paths to their controller functions.

const express = require('express');
const router = express.Router();

const {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicle.controller');

// 1. Create a vehicle
router.post('/', createVehicle);

// 2. Read all vehicles
router.get('/', getAllVehicles);

// 3. Read one vehicle by ID
router.get('/:id', getVehicleById);

// 4. Update vehicle by ID
router.put('/:id', updateVehicle);

// 5. Delete vehicle by ID
router.delete('/:id', deleteVehicle);

module.exports = router;
