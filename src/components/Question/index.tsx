import { ReactNode } from 'react';
import './style.scss';
import cl from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode; //ReactNode é o tipo dos Componentes no React
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ content, author, children, isAnswered = false, isHighlighted = false }: QuestionProps) {
  return (
    <div className={cl(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered}
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}