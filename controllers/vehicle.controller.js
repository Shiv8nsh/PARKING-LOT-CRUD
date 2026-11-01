// ==============================================================================
// VEHICLE CONTROLLER
// ==============================================================================
// In MVC architecture, the "Controller" holds the core business logic.
// It receives incoming HTTP requests (req), interacts with the Model (Vehicle),
// and sends back HTTP responses (res) with appropriate HTTP status codes.

const Vehicle = require('../models/vehicle.model');

// ------------------------------------------------------------------------------
// 1. CREATE: Add a new vehicle to the database
// Route: POST /api/vehicles
// ------------------------------------------------------------------------------
const createVehicle = async (req, res) => {
    try {
        // Extract data sent in the request body (parsed by express.json middleware)
        const { vehicleNumber, vehicleType, ownerName, parkingFee, status } = req.body;

        // Create a new vehicle document using the Mongoose model
        const newVehicle = await Vehicle.create({
            vehicleNumber,
            vehicleType,
            ownerName,
            parkingFee,
            status: status || 'Parked'
        });

        // Return HTTP 201 (Created) along with the newly created document
        return res.status(201).json(newVehicle);
    } catch (error) {
        // Return HTTP 400 (Bad Request) if validation fails or required fields are missing
        return res.status(400).json({
            message: 'Failed to create vehicle record',
            error: error.message
        });
    }
};

// ------------------------------------------------------------------------------
// 2. READ ALL: Fetch all vehicle records
// Route: GET /api/vehicles
// ------------------------------------------------------------------------------
const getAllVehicles = async (req, res) => {
    try {
        // Fetch all vehicle records, sorted by most recent first
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });

        // Return HTTP 200 (OK) with the array of vehicle records
        return res.status(200).json(vehicles);
    } catch (error) {
        // Return HTTP 500 (Internal Server Error) if database query fails
        return res.status(500).json({
            message: 'Failed to fetch vehicles',
            error: error.message
        });
    }
};

// ------------------------------------------------------------------------------
// 3. READ ONE: Fetch a single vehicle record by MongoDB _id
// Route: GET /api/vehicles/:id
// ------------------------------------------------------------------------------
const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the vehicle by its unique MongoDB _id
        const vehicle = await Vehicle.findById(id);

        // If no vehicle matches this _id, return HTTP 404 (Not Found)
        if (!vehicle) {
            return res.status(404).json({
                message: `Vehicle with id ${id} not found`
            });
        }

        // Return HTTP 200 (OK) with the found vehicle object
        return res.status(200).json(vehicle);
    } catch (error) {
        // Return HTTP 500 or 400 if the provided ID format is invalid
        return res.status(500).json({
            message: 'Error fetching vehicle by ID',
            error: error.message
        });
    }
};

// ------------------------------------------------------------------------------
// 4. UPDATE: Modify an existing vehicle record by _id
// Route: PUT /api/vehicles/:id
// ------------------------------------------------------------------------------
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        // findByIdAndUpdate parameters:
        // 1. id: the document _id to match
        // 2. req.body: the updated fields sent by the client
        // 3. { new: true }: returns the updated document instead of the old one
        //    { runValidators: true }: ensures updates adhere to schema validation rules
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        // If no vehicle exists with this _id, return HTTP 404
        if (!updatedVehicle) {
            return res.status(404).json({
                message: `Vehicle with id ${id} not found`
            });
        }

        // Return HTTP 200 (OK) with the updated vehicle document
        return res.status(200).json(updatedVehicle);
    } catch (error) {
        // Return HTTP 400 if schema validation fails during update
        return res.status(400).json({
            message: 'Failed to update vehicle',
            error: error.message
        });
    }
};

// ------------------------------------------------------------------------------
// 5. DELETE: Remove a vehicle record by _id
// Route: DELETE /api/vehicles/:id
// ------------------------------------------------------------------------------
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the vehicle by _id and remove it from the database collection
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        // If no vehicle exists with this _id, return HTTP 404
        if (!deletedVehicle) {
            return res.status(404).json({
                message: `Vehicle with id ${id} not found`
            });
        }

        // Return HTTP 200 (OK) with a success confirmation message
        return res.status(200).json({
            message: 'Vehicle deleted successfully',
            deletedVehicle
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to delete vehicle',
            error: error.message
        });
    }
};

// Export all 5 controller functions so the routes can use them
module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
