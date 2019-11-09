const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ListDetails = require('./listDetails');

const app = express();

mongoose.connect('mongodb://@localhost:27017/datalist', {
    useMongoClient: true
});

// serve files in static ' folder at root URL ' / '
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to get all the items
app.route('/api')
    .get(function(req, res) {
        ListDetails
            .find()
            .exec()
            .then(docs => {
                console.log(docs);
                if (docs.length > 0) {
                    res.status(200).json(docs);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    });

//to get item by ID
app.route('/api/:itemID')
    .get(function(req, res) {
        const id = req.params.itemID;
        ListDetails.findOne({ name: id })
            .exec()
            .then(doc => {
                console.log(doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: 'No valid entry found' })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    });

//to add an item
app.route('/api')
    .post(function(req, res) {
        const listDetails = new ListDetails({
            name: req.body.name,
            type: req.body.type,
            quantity: req.body.quantity,
            duration: req.body.duration,
            name_french: req.body.name_french
        });
        listDetails
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'POST REQUEST handling',
                    createdDetail: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    });

// to update quantity of item passed
app.route('/api/:itemID')
    .put(function(req, res) {
        const id = req.params.itemID;
        ListDetails.update({ name: id }, { $set: { quantity: req.body.quantity } })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    });


// name: req.body.name,
// type: req.body.type,
// quantity: req.body.quantity,
// duration: req.body.duration,

// to update loan time
app.route('/api')
    .put(function(req, res) {
        ListDetails.updateMany({ type: req.body.type }, { $set: { duration: req.body.duration } })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    });

//to delete an item by name
app.route('/api/:itemID')
    .delete(function(req, res) {
        const id = req.params.itemID;
        ListDetails
            .remove({ name: id })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

app.listen(3000); // start server

console.log('Listening on port 3000');