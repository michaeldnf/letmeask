/* Importações das Estilizações */
import './style.scss';

/* Importações das Imagens */
import copyImage from '../../assets/images/copy.svg';

/* Define o tipo da propriedade que o componente recebe */
type RoomCodeProps = {
  code: string;
}

/* Função Principal */
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code); //Função para copiar um texto no navegador
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImage} alt="Copiar código da sala" />
      </div>
      <span>{`Sala #${props.code}`}</span>
    </button>
  );
}