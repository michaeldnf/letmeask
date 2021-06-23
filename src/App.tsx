/* Importações Externas */
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Importações Internas - Componentes */
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

/* Importações Internas - Contextos */
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  //O switch serve para se uma das rotas for satisfeita ele vai parar de procurar 
  //por outra rota e evitar que carregue duas rotas na mesma página
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" exact component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
