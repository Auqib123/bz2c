const mongoose = require('../connection/connection')
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },

}, { versionKey: false })
//Create Index for location
customerSchema.index({ location: "2dsphere" });
module.exports.CustomerModel = mongoose.model('CustomerModel', customerSchema, "customers")
