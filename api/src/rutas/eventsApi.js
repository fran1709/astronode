const { Router, json } = require('express');

const router = Router();
const url = 'https://ll.thespacedevs.com/2.2.0/event/';

router.get('/event', async (req, res) =>{
    try {
        const response = await fetch(url);
        const event = await response.json();
        res.json(event);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;