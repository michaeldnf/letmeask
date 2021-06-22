import { ButtonHTMLAttributes} from 'react'; //Importa as props de um Button no HTML

import '../styles/button.scss'; //Importa o style do Button

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //Atribuindo as propriedades do Button

export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props}></button>
  );
}