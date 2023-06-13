const { Router } = require('express');

const router = Router();
const url = 'https://api.nasa.gov/planetary/apod?api_key=SWtg2yEpE6vPwyM8NgnaNS3CVVg1NuhfzS6zgbYz';

// [ GET ]
router.get('/pod', async (req, res) =>{
    try {
        const response = await fetch(url);
        const pod = await response.json();
        res.json(pod);
    } catch (error) {
        res.send(error);
    }
});

// [ POST ]


module.exports = router;