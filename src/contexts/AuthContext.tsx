/* Importações Externas */
import { createContext, ReactNode, useEffect, useState } from "react";

/* Importações Internas */
import { auth, firebase } from "../services/firebase";

/* Declaração dos tipos (TYPESCRIPT) */
type User = {
  id: String;
  name: String;
  avatar: String;
}

type AuthContextType = {
  user: User | undefined; // Ele pode ser do tipo User ou undefined
  signInWithGoogle: () => Promise<void>; // Essa função retorna do tipo Promise porém o valor dela é void
}

type AuthContextProviderProps = { children: ReactNode } // ReactNode é o tipo de um componente no React
/* --------------------------------- */

//Cria um contexto de autenticação e já exporta ele
//O objeto {} é do tipo AuthContextType declarado ali em cima
export const AuthContext = createContext({} as AuthContextType); 

export function AuthContextProvider(props: AuthContextProviderProps) {
  // Para declarar o tipo do useState tem que colocar o <Type>
  const [user, setUser] = useState<User>(); 

  //O useEffect executa uma função toda vez que ele observa uma alteração em uma variável, componente, etc...
  useEffect(() => { 
    //onAuthStateChanged verifica se houve uma alteração na autenticação
    //E assim ele verifica se o usuário ainda está conectado
    const unsubscribe = auth.onAuthStateChanged(user => { 
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Faltando informações na conta do Google!!');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    //É recomendável retornar uma função que remove os EventListeners que foi cadastrado
    //Para evitar de dar erro quando estiver em outra tela e o Evento ainda estiver rodando
    return () => { unsubscribe() }; 
  }, []); // Porém quando é vazio [] ele executa apenas uma vez

  async function signInWithGoogle() {
    //Instância o provedor de autenticação do Google
    const provider = new firebase.auth.GoogleAuthProvider();
    
    //Abre o popup de Login do Google e armazena o resultado em result
    //Como é uma função Async ele aguarda (AWAIT) o login para poder continuar
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Faltando informações na conta do Google!!');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  
  //AuthContext.Provider é o Elemento que compartilha, com todos os filhos,
  //o contexto que é passado através da propriedade value
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}