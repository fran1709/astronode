const { Router } = require('express');
const { users_collection, comment_collection, response_collection } = require("../DataFirebase");
const { getDocs, addDoc, doc, getDoc } = require("@firebase/firestore");

const router = Router();

// [ GET ]

router.get('/coments', async (req, res) =>{
  try {
    const documento = await getDocs(comment_collection);
    let foro = [];

    if (documento) { 
      foro = documento.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      res.status(200).json(foro);
    } else {
      console.log('El documento no existe');
      res.status(404).send('El documento no existe');
    }
  } catch (error) {
    console.log('Error obteniendo el documento:', error);
    res.status(500).send('Error al obtener comentarios.');
  }
}); 

router.get('/usuarios', async (req, res) => {
    try {
      const documento = await getDocs(users_collection);
      let usuarios = [];
  
      if (documento) { 
        usuarios = documento.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(usuarios);
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

// Agregando nuevos comentarios de primer nivel
router.post('/coments', async (req, res) => {
  
  //console.log(req.body.comment);
  if (!req.body.title){
    res.status(400).send('Petición no precesada, comentario sin título.');
  } else if(!req.body.comment){
    res.status(400).send('Petición no precesada, no hay un comentario.');
  } else {
    await addDoc(comment_collection,{
      comment : req.body.comment,
      date : req.body.date,
      responses : req.body.responses,
      tittle : req.body.title,
      userInfo : req.body.userInfo
    });
    res.status(200).send('Petición precesada con éxtio!');
  }
});

// Agregando nuevos comentarios de segundo nivel
router.post('/response', async (req,res) => {
  console.log(req.body);
  if(req.body.id && req.body.comment){
    const documentoRef = doc(comment_collection, req.body.id);
    //console.log(documentoRef);
    getDoc(documentoRef).then((doc) => {
      const array = doc.data().responses;
      // Realizar el append al array
      array.push(objeto);

      // Actualiza el documento en Firebase con el nuevo valor del array
      documentoRef.update({
        nombreArray: array,
      });
      
    });

    res.status(200).send('Petición precesada con éxtio!');
  } else {
    res.status(400).send('Petición precesada sin éxtio! Faltan datos validos.');
  }
  
});

router.post('/usuarios', async (req, res) => {
  console.log(req.body);
  res.send("recibido");
})

module.exports = router;