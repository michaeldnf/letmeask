/* Importações Externas */
import { useHistory } from 'react-router-dom';

/* Importações Internas - Hooks */
import { useAuth } from '../hooks/useAuth';

/* Importações Internas - Componentes */
import { Button } from '../components/Button';

/* Importações de Estilização */
import '../styles/auth.scss';

/* Importações das Imagens */
import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

/* Função Principal */
export function Home() {
  const history = useHistory(); //Permite a navegação entre as rotas do APP
  const { signInWithGoogle, user } = useAuth(); //Pega os dados do Contexto de Autenticação

  async function handleCreateRoom(){
    if(!user) { //Verifica se o usuário está logado
      await signInWithGoogle();
    }

    history.push('/rooms/new'); //Redireciona para a rota ...
  }
  
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      
      <main>
        <div className="main-content">
          <img src={logoImage} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImage} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}