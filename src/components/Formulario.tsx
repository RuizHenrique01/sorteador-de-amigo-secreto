import style from './Formulario.module.css';
import Participante from '../assets/Wavy Buddies Out of Stock.svg';
import Participantes from './Participantes';

const Formulario = () => {
    return (
        <div className={style.formulario}>
            <div className={style.formulario_header}>
                <div className={style.formulario_header_logo} role='img' aria-label='Logo'></div>
                <img src={Participante} className={style.formulario_header_image} alt='Imagem do participante'/>
            </div>
            <div className={style.formulario_body}>
                {/* <input placeholder="Insira os nomes dos participantes" />
                <button disabled>Adicionar</button> */}
                <Participantes/>
            </div>
        </div>)
}

export default Formulario;