// Import Express to configure the routes.
const express = require('express');
const router = express.Router();

//Import the Model (sushi.js) to use its functions.
const db = require('../models');

// ---------------------------------------------------------------------------------------------------------------------
// Routes

// Get route to render all of the sushi from the database into the index.handlebars on page load.
router.get('/', function (req, res) {

  db.Sushi.findAll({
    order: [['sushi_name', 'ASC']]
  }).then(function (data) {
    const hbsObject = {Sushi: data};
    res.render('index', hbsObject)
  });

});

// POST route to add a new sushi to the database and page, it passes the name and the eaten status to the model.
router.post('/api/sushi', function (req, res) {

  db.Sushi.create({
    sushi_name: req.body.sushi_name,
    mindfully_eaten: req.body.mindfully_eaten
  }).then(function (sushiCreate) {
    res.status(200).json(sushiCreate)
  });

});

// PUT route to update the status from not eaten to eaten and vice versa,
// it passes the eaten status and the ID on to the model.
router.put('/api/sushi/:id', function (req, res) {

  db.Sushi.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (sushiUpdate) {
    res.status(200).json(sushiUpdate)
  });

});

// DELETE route to remove a sushi from the database, it passes the ID of the deleted sushi to the model.
router.delete('/api/sushi/:id', function (req, res) {

  db.Sushi.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (sushiDestroy) {
    res.status(200).json(sushiDestroy)
  });

});


// Export routes for server.js to use.
module.exports = router;