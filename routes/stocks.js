var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all stocks */
router.get('/get', function (req, res, next) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        console.log("Load success: ", stocks);
        res.send(stocks);
    });

});

/* POST single stock */
router.post('/post', function (req, res, next) {
    var instance = new schema.Stock(req.body);

    schema.Stock.find({}).sort({ _id: -1 }).skip(10).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        console.log("Loader success: ", stocks);
        stocks.forEach(function (blog) {
            console.log("Loader success: ", stock);
            schema.Stock.findByIdAndRemove(blog._id).exec();
        });
    });

    instance.save(function (err, Stock) {
        result = err ? err : Stock;
        res.send(result);
        router.notifyclients();
        return result;
    });
});

/* REMOVE stock */
router.post("/remove", (req, res) => {
    schema.Stock.findById(req.body.id, function (err, stock) {
        if (err) {
            res.json({ 'ERROR': err });
        } else {
            stock.remove(function (err) {
                if (err) {
                    res.json({ 'ERROR': err });
                } else {
                    res.json({ 'REMOVED': stock });
                    router.notifyclients();
                }
            });
        }
    });
});

/**
 * Stock PRICE
 */
router.post("/stockPrice", (req, res) => {
    var instance = new schema.StockPrice(req.body);
    if (!req.body.price) {
        res.json({ success: false, message: 'Stockprice not found!' });
    } else {
        if (!req.body.id) {
            res.json({ success: false, message: 'Id not found!' });
        } else {
            schema.Stock.update(
                { _id: req.body.id },
                { $push: { stockPrice: { "$each": [instance], "$position": 0 } } },
                function (err, StockPrice) {
                    if (err) {
                        res.json({ success: false, message: 'Could not save price!' });
                    } else {
                        res.json({ success: true, message: 'Price saved succesfuly!' });
                        router.notifyclients();
                    }
                });
        }
    }
});


/* Notify stock values to connected clients */
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        var toNotify = client ? new Array(client) : router.clients;
        toNotify.forEach(function (socket) {
            socket.emit('refresh', stocks);
        })
    });
}

//export the router
module.exports = router;
