/* Importações Externas */
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* Importações Internas - Hooks & Firebase */
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

/* Importações Internas - Componentes */
import { Button } from '../components/Button';

/* Importações de Estilização */
import '../styles/auth.scss';

/* Importações das Imagens */
import illustrationImage from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg';

/* Função Principal */
export function NewRoom() {
  const { user } = useAuth(); //Pega os dados do Contexto de Autenticação
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') return;
    
    const roomRef = database.ref('rooms');    //Pega a 'tabela' rooms
    const firebaseRoom = await roomRef.push({ //E insere os dados
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={ handleCreateRoom }>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={ event => setNewRoom(event.target.value) }
              value={newRoom}
            />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? 
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}