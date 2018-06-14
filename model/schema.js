var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.stockValueSchema = new Schema({
    value: String,
    date: { type: Date, default: Date.Now }
});

exports.stockSchema = new Schema({
    name: String,
    value: [exports.stockValueSchema]
});

exports.Stock = mongoose.model('Stock', exports.stockSchema);
exports.Value = mongoose.model('Price', exports.stockValueSchema);
