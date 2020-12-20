const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Object = require('./models/object.model')


mongoose.connect('mongodb://127.0.0.1:27017/swapup', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/objects', (req, res, next) => {
    const object = new Object({
        ...req.body
    });
    object.save()
    .then(() => res.status(201).json({message: 'object saved'}))
    .catch(error => res.status(400).json({error}));
});

app.get('/api/objects/:id', (req, res, next) => {
    Object.findOne({ _id: req.params.id })
    .then(object => res.status(200).json(object))
    .catch(error => res.status(404).json({error}));
})

app.get('/api/objects', (req, res, next) => {
    Object.find()
    .then(objects => res.status(200).json(objects))
    .catch(error => res.status(400).json({error}));
});

module.exports = app;