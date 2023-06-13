const { Router } = require('express');
const { users_collection } = require("../DataFirebase");
const { getDocs } = require("@firebase/firestore");

const router = Router();

// [ GET ]

router.get('/saludo', (req, res) =>{
    try{
        res.send('Hola Isabel, Apui y Brayan!');
    } catch (error){
        console.log(error);
        res.status(500).send('Error al obtener saludo.');
    }
    
}); 

router.get('/usuarios', async (req, res) => {
    try {
      const documento = await getDocs(users_collection);
      let usuarios = [];
  
      if (documento) { 
        usuarios = documento.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).send(usuarios);
      } else {
        console.log('El documento no existe');
        res.status(404).send('El documento no existe');
      }
    } catch (error) {
      console.log('Error obteniendo el documento:', error);
      res.status(500).send('Error al obtener usuarios.');
    }
});  

// [ POST ]
router.post('/usuarios', async (req, res) => {
  console.log(req.body);
  res.send("recibido");
})

module.exports = router;