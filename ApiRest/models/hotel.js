var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotel = new Schema({
    id: {type: String},
    name: {type: String},
    stars: {type: Number},
    price: {type: Number},
    image: {type: String},
    amenities: [{type: String}],
});

module.exports = mongoose.model('Hotel', hotel);