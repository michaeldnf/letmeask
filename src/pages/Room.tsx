/* Importações Externas */
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Importações Internas - Components */
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

/* Importações Internas - Hooks & Firebase */
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

/* Importações de Estilização */
import '../styles/room.scss';

/* Importação de Imagens */
import logoImage from '../assets/images/logo.svg';

type RoomParams = { id: string } //Define o tipo de parâmetro que é enviado para a página

type FirebaseQuestions = Record<string, { //Define o tipo dos dados que será resgatado no BD
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>;

type Question = { //Define o tipo dos dados das Questões
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

/* Função Principal */
export function Room() {
  const params = useParams<RoomParams>(); //Pega os parâmetros que é passado na URL
  const roomId = params.id;

  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]); //Quando o Tipo requer um array precisa colocar <type[]>
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`); //Pega a sala selecionada no BD
    roomRef.on('value', room => {
      const dbRoom = room.val(); //Pega todos os valores armazenadas na sala
      
      //Pego somente as questões e joga na variável sendo preciso definir o tipo dela
      const firebaseQuestions: FirebaseQuestions = dbRoom.questions ?? {}; 

      //Converte o objeto em um Array e percorre por ele, retornando todas as perguntas armazenadas
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {  
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(dbRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) { //Sempre que for preciso chamar o evento tem que colocar o tipo FormEvent
    event.preventDefault();
    if (newQuestion.trim() === '') return;
    if (!user) throw new Error("Usuário não autenticado!");

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }
    await database.ref(`rooms/${roomId}/questions`).push(question); //Armazena a questão dentro do BD com o PUSH

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          ></textarea>

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt="user.name" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
}