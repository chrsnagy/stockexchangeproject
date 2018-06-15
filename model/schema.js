var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.stockValueSchema = new Schema({
    date: { type: Date, default: Date.Now },
    value: String
});

exports.stockSchema = new Schema({
    name: String,
    values: [exports.stockValueSchema]
});

exports.Stock = mongoose.model('Stock', exports.stockSchema);
exports.Value = mongoose.model('Value', exports.stockValueSchema);
