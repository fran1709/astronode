const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const { users_collection } = require("./DataFirebase");
const { getDocs } = require("@firebase/firestore");

const api = express();

// settings
api.set('port', process.env.PORT || 3000);

// middlewares
api.use(morgan('dev'));
api.use(express.urlencoded({extended:false}));
api.use(express.json());
api.use(cors());

// rutas
api.get('/saludo', (req, res) =>{
    try{
        res.send('Hola Isabel, Apui y Brayan!');
    } catch (error){
        console.log(error);
        res.status(500).send('Error al obtener saludo.');
    }
    
}); 
api.get('/usuarios', async (req, res) => {
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

// Starting server
api.listen(3000, () =>{
    console.log(`Server on port ${api.get('port')}`);
});