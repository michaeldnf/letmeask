/* Importações Externas */
import React from 'react';
import ReactDOM from 'react-dom';

/* Importações Internas */
import App from './App';
import './services/firebase';

/* Importação de Estilização */
import './styles/global.scss';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();