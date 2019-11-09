const mongoose = require('mongoose');

const dataListSchema = mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    type: { type: String, required: true, max: 20 },
    quantity: { type: Number, required: true },
    duration: { type: Number, required: true },
    name_french: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model('ListDetails', dataListSchema);