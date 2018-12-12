const express = require('express');
const router = express.Router();


// GET a list of noinjas from teh DB
router.get('/ninjas', (req, res) => {
  res.send( {type: "GET" });
})

// POST add a new ninja to the list
router.post('/ninjas', (req, res) => {
  res.send({ type: "POST"});
});

// PUT - update a ninja in tje DB
router.put('/ninjas/:id', (req, res) => {
  res.send({ type: "PUT" });
})

// DELETE - delete a ninja in the DB
router.delete('/ninjas/:id', (req, res) => {
  res.send({ type: "DELETE" });
})