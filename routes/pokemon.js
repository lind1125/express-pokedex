
const db = require('../models')
const express = require('express');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(favorites=>{
    res.render('pokemon/index', {favorites: favorites})
  })
  .catch(err =>{
    console.log(err)
  })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
})
.then(([createdFave, wasCreated])=>{
    res.redirect('/pokemon')
})
.catch(err=>{
    console.log('ERROR:', err)
})
});

module.exports = router;
