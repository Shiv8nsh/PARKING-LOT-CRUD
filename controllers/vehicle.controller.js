// Vehicle Controller
// Contains the 5 CRUD functions to interact with the MongoDB database.

const Vehicle = require('../models/vehicle.model');

// 1. CREATE: Add a new vehicle record
// Method: POST /api/vehicles
async function createVehicle(req, res) {
    try {
        const { vehicleNumber, vehicleType, ownerName, parkingFee, status } = req.body;

        const newVehicle = await Vehicle.create({
            vehicleNumber: vehicleNumber,
            vehicleType: vehicleType,
            ownerName: ownerName,
            parkingFee: parkingFee,
            status: status || 'Parked'
        });

        return res.status(201).json(newVehicle);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// 2. READ ALL: Get all vehicle records
// Method: GET /api/vehicles
async function getAllVehicles(req, res) {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// 3. READ ONE: Get a single vehicle by ID
// Method: GET /api/vehicles/:id
async function getVehicleById(req, res) {
    try {
        const id = req.params.id;
        const vehicle = await Vehicle.findById(id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// 4. UPDATE: Update status or fee of an existing vehicle
// Method: PUT /api/vehicles/:id
async function updateVehicle(req, res) {
    try {
        const id = req.params.id;

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        return res.status(200).json(updatedVehicle);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// 5. DELETE: Remove a vehicle by ID
// Method: DELETE /api/vehicles/:id
async function deleteVehicle(req, res) {
    try {
        const id = req.params.id;
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        return res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
