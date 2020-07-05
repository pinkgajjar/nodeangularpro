
const mongoose = require('mongoose');
const dbConfig = require('../database/db');

const Schema = mongoose.Schema;
var connection = mongoose.createConnection(dbConfig.db);
const  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);
let assetSchema = new Schema({
 
    id: { type: Number, 
        ref: 'Id' },
    assetname: {
        type: String
    },
    status: {
        type: String
    },
    regdate: {
        type: String
    }
}, {
    collection: 'assets'
})
assetSchema.plugin(autoIncrement.plugin, 'Id');

module.exports = mongoose.model('Asset', assetSchema)