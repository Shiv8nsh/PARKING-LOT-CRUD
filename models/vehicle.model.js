// Vehicle Model
// Defines the structure of vehicle documents stored in MongoDB.

const mongoose = require('mongoose');

// Define the schema (blueprint) for a vehicle record
const vehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: {
            type: String,
            required: [true, 'Vehicle number is required'],
            trim: true,
            uppercase: true
        },
        vehicleType: {
            type: String,
            required: [true, 'Vehicle type is required'],
            enum: ['Bike', 'Car']
        },
        ownerName: {
            type: String,
            required: [true, 'Owner name is required'],
            trim: true
        },
        parkingFee: {
            type: Number,
            required: [true, 'Parking fee is required'],
            min: [0, 'Parking fee cannot be negative']
        },
        status: {
            type: String,
            enum: ['Parked', 'Exited'],
            default: 'Parked'
        }
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true
    }
);

// Create the model from the schema
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
