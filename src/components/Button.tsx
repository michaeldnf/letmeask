import { ButtonHTMLAttributes } from 'react'; //Importa as props de um Button do HTML

import '../styles/button.scss'; //Importa o style do Button

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}; //Atribuindo as propriedades do Button ao type

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button
     className={`button ${isOutlined ? 'outlined' : ''}`} 
     {...props}
     />//...passando as props para o button
  );
}