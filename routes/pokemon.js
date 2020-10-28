
const db = require('../models')
const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(favorites=>{
    console.log(favorites)
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

router.get('/:id', function(req, res) {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.id}`)
  .then(response=>{
    let results = response.data
    console.log(results)
    res.render('pokemon/show.ejs', {pokemon: results})
  })
  .catch(err =>{
    console.log('ERROR IS HAPPENING:'+err)
  })
})

module.exports = router;
