/* Importações Externas */
import { useHistory, useParams } from 'react-router-dom';

/* Importações Internas - Components */
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

/* Importações Internas - Hooks & Firebase */
import { useRoom } from '../hooks/useRoom';

/* Importações de Estilização */
import '../styles/room.scss';

/* Importação de Imagens */
import logoImage from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';
import { database } from '../services/firebase';

type RoomParams = { id: string } //Define o tipo de parâmetro que é enviado para a página

/* Função Principal */
export function AdminRoom() {
  const params = useParams<RoomParams>(); //Pega os parâmetros que é passado na URL
  const roomId = params.id;
  const history = useHistory();
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    };
  }
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({ //Para atualizar um valor no BD
      endedAt: new Date()
    });

    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
            
        <div className="question-list">
          {questions.map((question) => { //ForEach no React tem que utilizar o map()
            return (
              <Question 
                //Precisa passar uma chave única para diferenciar entre um item e outro (Algoritmo de Reconciliação)
                key={question.id} 
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImage} alt="Remover Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}