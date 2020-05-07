const express = require('express');
const router = express.Router();
const Solid = require('../../Solid');

const Solids = [
  {
    name: 'Solid 1',
    material: 'Plastic',
    density: 20,
    id: 'b65cce18-a070-43ac-b3a6-2ffbfc2c103c'
  },
  {
    name: 'Solid 2',
    material: 'Metal',
    density: 50,
    id: 'hasd9f73-jf86-kf09-f755-asdf9yh3ongo'
  }
];

// JSON/body parser middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// create new solid
router.post('/', (req, res) => {
  if (validSolid(req.body)) {
    const newSolid = new Solid(
      req.body.name,
      req.body.material,
      req.body.density
    );
    Solids.push(newSolid);
    return res.redirect('/');
  } else {
    return res.json({ messsge: 'Error - Invalid Solid' });
  }
});

// delete solid
router.delete('/:id', (req, res) => {
  Solids.forEach((solid, i) => {
    if (req.params.id === solid.id) {
      Solids.splice(i, 1);
    }
  });
});

// get all Solids
router.get('/', (req, res) => {
  return res.json(Solids);
});

//get single solid
router.get('/:id', (req, res) => {
  Solids.forEach((solid) => {
    if (req.params.id === solid.id) return res.json(solid);
  });
});

function validSolid(solid) {
  const hasName = typeof solid.name === 'string' && solid.name !== '';
  const hasMaterial =
    typeof solid.material === 'string' && solid.material !== '';
  const hasDensity = typeof solid.density === 'string' && solid.density !== '';
  return hasName && hasMaterial && hasDensity;
}

module.exports = { router, Solids };