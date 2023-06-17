const { Router, json } = require('express');

const router = Router();
const fetch = require('node-fetch');
const apiKey = 'BksdAtfTm+s4Yvj1xZAX5Q==BYoxaPn4q5Mr1eFY';

// [ GET ]
router.get('/star', async(req, res) => {
    var name = req.body.name;
    const request = await fetch('https://api.api-ninjas.com/v1/stars?name=' + name, {headers: {'X-Api-Key': apiKey}});
    const data = await request.json();
    //console.log(data);
    //console.log(name);
    res.json(data);
});

router.get('/planet', async(req, res) => {
    var name = req.body.name;
    const request = await fetch('https://api.api-ninjas.com/v1/planets?name=' + name, {headers: {'X-Api-Key': apiKey}});
    const data = await request.json();
    //console.log(data);
    //console.log(name);
    res.json(data);
});

module.exports = router;