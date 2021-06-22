/* Importações Externas */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//Configuração das chaves de autenticação do Firebase
//Ele está importando as configs através de variáveis de ambiente do arquivo .env.local na raiz do projeto
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig); //Inicializa o firebase através das configs feitas

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };