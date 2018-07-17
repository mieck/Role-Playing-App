const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Actual DB model
const imageSchema = new mongoose.Schema({
    filename: String,
    destination: String
});
module.exports = mongoose.model('Image', imageSchema);
