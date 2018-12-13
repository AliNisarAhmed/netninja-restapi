const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// GET a list of noinjas from teh DB
router.get('/ninjas', async (req, res, next) => {
  if (!req.query.lng && !req.query.lat) {
    let ninjas = await Ninja.find({});
    res.send(ninjas);
  } else {
    Ninja.aggregate().near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      }, 
      maxDistance: 100000,
      spherical: true,
      distanceField: "dis"
    }).then(function(ninjas) {
      res.send(ninjas);
    })
  }
})

// POST add a new ninja to the list
router.post('/ninjas', async (req, res, next) => {
  try {
    const ninja = await Ninja.create(req.body);
    res.send(ninja);
  } catch (error) {
    next(error);
  }
});

// PUT - update a ninja in the DB
router.put('/ninjas/:id', async (req, res, next) => {
  let ninja = await Ninja.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
  res.send(ninja);
})

// DELETE - delete a ninja in the DB
router.delete('/ninjas/:id', async (req, res, next) => {
  let ninja = await Ninja.findByIdAndRemove({_id: req.params.id});
  res.send(ninja);
})

module.exports = router;