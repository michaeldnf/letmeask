/* Importações Externas */
import { useEffect, useState } from "react";

/* Importações Internas - Hooks & Firebase */
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

//Define o tipo dos dados que será resgatado no BD
type FirebaseQuestions = Record<string, { 
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

//Define o tipo dos dados das Questões
type QuestionType = { 
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeId: string | undefined;
  likeCount: number;
}

/* Função Principal */
export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]); //Quando o Tipo requer um array precisa colocar <type[]>
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
          isAnswered: value.isAnswered,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          likeCount: Object.values(value.likes ?? {}).length,
        }
      });

      setTitle(dbRoom.title);
      setQuestions(parsedQuestions);

      return () => roomRef.off('value'); //Remover o evento de listener do useEffect
    });
  //Quando tem uma variável de fora do componente é bom colocar ele na atuação do useEffect
  }, [roomId, user?.id]); 

  return { questions, title };
}