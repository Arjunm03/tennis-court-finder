import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courtSchema = new Schema({
    placeId: String,
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    phone: String,
    website: String,
    type: {
        type: String,
        enum: ['public', 'private', 'club', 'unknown'],
        default: 'unknown'
    },
    condition: {
        type: String,
        enum: ['unplayable', 'bad', 'average', 'great', 'excellent', 'unknown'],
        default: 'unknown'
    },
    features: {
        hard: Boolean,
        clay: Boolean,
        grass: Boolean,
        carpet: Boolean,
        outdoor: Boolean,
        indoor: Boolean,
        lights: Boolean,
        bathrooms: Boolean,
        free: Boolean,
        proShop: Boolean,
        backboard: Boolean,
        water: Boolean,
    },
    courts: {
        totalCourts: Number,
        hardCourts: Number,
        clayCourts: Number,
        grassCourts: Number,
        carpetCourts: Number,
        indoorCourts: Number,
        outdoorCourts: Number,
    },
}, { timestamps: true });

export default mongoose.model('Court', courtSchema);