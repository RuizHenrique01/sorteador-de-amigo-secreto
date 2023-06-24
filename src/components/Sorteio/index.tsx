import style from './Sorteio.module.css';
import { BsFillDice5Fill } from 'react-icons/bs';
import Aviao from '../../assets/Avião-papel 1.svg';

const Sorteio = () => {
    return (<div className={style.sorteio_body}>
        <h2 className={style.sorteio_title}>Quem vai tirar o papelzinho?</h2>
        <select className={style.sorteio_select} >
            <option value="Selecione seu nome" selected>Selecione seu nome</option>
        </select>

        <p className={style.sorteio_info}>Clique em em sortear para ver quem é seu amigo secreto!</p>

        <div className={style.sorteio_button_body}>
            <div className={style.sorteio_button_img_body}>
                <BsFillDice5Fill className={style.sorteio_button_img}/>
            </div>
            <button className={style.sorteio_button}>Sortear!</button>
        </div>

        <p className={style.sorteio_winner}>Lúcia</p>
        <img src={Aviao} alt='Avião' className={style.sorteio_aviao_img}/>
    </div>);
}

export default Sorteio;