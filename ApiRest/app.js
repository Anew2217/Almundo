var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var methodOverride = require("method-override");
var mongose = require('mongoose');
var mongoose = require('mongoose');

//Controllers
var HotelCtrl = require('./controllers/hotelController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

var router = express.Router();

app.use(router);

mongoose.connect('mongodb://localhost/hotels', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to database. ' + err);
    }
    else {
        console.log('Connected to Database.')
    }
    app.listen(3000, function () {
        console.log("Node server runing on port 3000");
    })
});

//API routes
var hotel = express.Router();

hotel.route('/hotels')
    .get(HotelCtrl.findAllHotels)
    .post(HotelCtrl.addHotel);

hotel.route('/hotels/:id')
    .get(HotelCtrl.findById)
    .put(HotelCtrl.updateHotel)
    .delete(HotelCtrl.deleteHotel);

hotel.route('/saveAll').post(HotelCtrl.saveAll);

app.use('/api', hotel);