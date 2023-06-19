const { Router, json } = require('express');

const router = Router();
const issPosUrl = 'http://api.open-notify.org/iss-now.json';
const spacePeopleUrl = 'http://api.open-notify.org/astros.json';
const fetch = require('node-fetch');

// [ GET ]
router.get('/isspos', async (req, res) =>{
    const data = await fetch(issPosUrl);
    const issPos = await data.json();
    res.json(issPos);
});

router.get('/pis', async (req, res) =>{
    const data = await fetch(spacePeopleUrl);
    const spacePeople = await data.json();
    res.json(spacePeople);
});

module.exports = router;