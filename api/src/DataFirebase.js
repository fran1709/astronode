const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, getDoc } = require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDf-dKtAh4Ir4L-e2pE3q40W1c4vFY6--E",
  authDomain: "servicesystem-5c93d.firebaseapp.com",
  projectId: "servicesystem-5c93d",
  storageBucket: "servicesystem-5c93d.appspot.com",
  messagingSenderId: "582019543314",
  appId: "1:582019543314:web:05bf1aa60be5fb5eb503cb"
};

const app = initializeApp(firebaseConfig);

// Conexión a la DB de firebase
const DataFireBase = getFirestore(app);

// Colecciones

// User Collection
const users_collection = collection(DataFireBase, "users");

// Exportación de constantes/variables
module.exports = {
  users_collection
};
