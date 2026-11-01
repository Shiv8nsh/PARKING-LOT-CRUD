// ==============================================================================
// VEHICLE MODEL (Mongoose Schema & Model)
// ==============================================================================
// In MVC architecture, the "Model" defines the shape/structure of the data
// stored in MongoDB and provides methods to interact with the database collection.

const mongoose = require('mongoose');

// Define Schema for Vehicle records in the parking lot
const vehicleSchema = new mongoose.Schema(
    {
        // Registration number of the vehicle (e.g., HR-26-AB-1234)
        vehicleNumber: {
            type: String,
            required: [true, 'Vehicle number is required'],
            trim: true,
            uppercase: true // Automatically converts input to uppercase for consistency
        },

        // Type of vehicle: restricted to either 'Bike' or 'Car'
        vehicleType: {
            type: String,
            required: [true, 'Vehicle type is required'],
            enum: {
                values: ['Bike', 'Car'],
                message: '{VALUE} is not supported. Must be Bike or Car'
            }
        },

        // Full name of the vehicle owner or driver
        ownerName: {
            type: String,
            required: [true, 'Owner name is required'],
            trim: true
        },

        // Parking fee in currency (e.g., 20 for Bike, 50 for Car)
        parkingFee: {
            type: Number,
            required: [true, 'Parking fee is required'],
            min: [0, 'Parking fee cannot be negative']
        },

        // Current status of the vehicle: 'Parked' or 'Exited'
        status: {
            type: String,
            enum: ['Parked', 'Exited'],
            default: 'Parked' // Newly registered vehicles default to 'Parked'
        }
    },
    {
        // timestamps: true automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true
    }
);

// Create the Mongoose model from the schema
// Mongoose creates a MongoDB collection named 'vehicles' (pluralized lowercase)
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Export the model so controllers can use it to perform CRUD operations
module.exports = Vehicle;
