import { ButtonHTMLAttributes } from 'react'; //Importa as props de um Button do HTML

import '../styles/button.scss'; //Importa o style do Button

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //Atribuindo as propriedades do Button ao type

export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props}></button> //...passando as props para o button
  );
}