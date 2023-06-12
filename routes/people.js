const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${req.params.id}/`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while trying to fetch person' });
  }
});

module.exports = router;
