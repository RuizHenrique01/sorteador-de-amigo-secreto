import style from './Participantes.module.css';
import { MdPersonAdd } from 'react-icons/md'
import { BsPlayCircle } from 'react-icons/bs';
import Compras from '../../assets/Wavy Buddies Shopping Bags.svg';

const Participantes = () => {
    return (<form className={style.participante_body}>
        <h2 className={style.participante_title}>Vamos começar!</h2>


        <div className={style.participante_add_input}>
            <div className={style.participante_input}>
                <MdPersonAdd className={style.participante_input_image} />
                <input type='text' placeholder='Insira os nomes dos participantes' name='participante' />
            </div>
            <button type='button' className={style.participante_add}>Adicionar</button>
        </div>
        <ul className={style.participante_names}>
            <li>Affonso</li>
            <li>Maria</li>
            <li>Juliana</li>
            <li>Luiz</li>
        </ul>

        <div className={style.participante_send_foot}>
            <div className={style.participante_send_button}>
                <BsPlayCircle className={style.participante_send_img}/>
                <button type='submit' className={style.participante_send}>Iniciar bricandeira!</button>
            </div>
            <img src={Compras} alt='Compras do participante' className={style.participante_buy_img} />
        </div>
    </form>);
}

export default Participantes