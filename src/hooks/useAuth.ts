/* Importações Externas */
import { useContext } from "react";

/* Importações Internas */
import { AuthContext } from "../contexts/AuthContext";

//HOOKS são basicamente todas as funções que começam com 'use' e 
//que são utilizadas no escopo de um componente

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}