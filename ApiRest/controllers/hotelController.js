var mongoose = require('mongoose');
//var Hotel = mongoose.model('Hotel');
var Hotel = require('../models/hotel');

exports.findAllHotels = function (req, res) {
    Hotel.find(function (err, hotels) {
        if (err) { res.send(500, err.message); }

        console.log('GET/hotels');
        res.status(200).jsonp(hotels);
    });
};

exports.findById = function (req, res) {
    Hotel.findById(req.params.id, function (err, hotel) {
        if (err) { res.send(500, err.message); }

        console.log('GET/hotel/' + req.params.id);
        res.status(200).jsonp(hotel);
    });
};

exports.addHotel = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var hotel = new Hotel({
        id: req.body.id,
        name: req.body.name,
        stars: req.body.stars,
        price: req.body.price,
        image: req.body.image,
        amenities: req.body.amenities
    });

    hotel.save(function (err, hotel) {
        if (err) { return res.status(500).send(err.message); }

        res.status(200).jsonp(hotel);
    });
};

exports.updateHotel = function (req, res) {
    Hotel.findById(req.body.id, function (err, hotel) {
        hotel.id = req.body.id;
        hotel.name = req.body.name;
        hotel.stars = req.body.stars;
        hotel.price = req.body.price;
        hotel.image = req.body.image;
        hotel.amenities = req.body.amenities;
    });

    hotel.save(function (err, hotel) {
        if (err) { return res.status(500).send(err.message); }

        res.status(200).jsonp(hotel);
    });
};

exports.deleteHotel = function (req, res) {
    Hotel.findById(req.params.id, function (err, hotel) {
        hotel.remove(function (err) {
            if (err) { return res.status(500).send(err.message); }

            res.status(200).send();
        });
    });
};

exports.saveAll = function (req, res) {
    var a = 1;
    
    req.body.forEach(e=>{
        var hotel = new Hotel({
            id: e.id,
            name: e.name,
            stars: e.stars,
            price: e.price,
            image: e.image,
            amenities: e.amenities
        });
        
        console.log('POST/ salvando registro '+a);
        a++;

        hotel.save(function (err, hotel) {
            if (err) { return res.status(500).send(err.message); }
    
            res.status(200).jsonp(hotel);
        });
    });
}