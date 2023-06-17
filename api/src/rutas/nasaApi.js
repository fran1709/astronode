const { Router, json } = require('express');

const router = Router();
const url = 'https://api.nasa.gov/planetary/apod?api_key=SWtg2yEpE6vPwyM8NgnaNS3CVVg1NuhfzS6zgbYz';
const roversURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=SWtg2yEpE6vPwyM8NgnaNS3CVVg1NuhfzS6zgbYz&sol=3860&camera=navcam';

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

router.get('/roverPics', async (req, res) => {
    const response = await fetch(roversURL);
    const pictures = await response.json();
    res.json(pictures);
})
// [ POST ]


module.exports = router;