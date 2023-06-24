import style from './Participantes.module.css';
import { MdPersonAdd } from 'react-icons/md'
import { BsPlayCircle } from 'react-icons/bs';
import Compras from '../../assets/Wavy Buddies Shopping Bags.svg';
import { useState } from 'react';

const Participantes = () => {

    const [nome, setNome] = useState<string>('');
    const [listNome, setListNome] = useState<string[]>([]);

    const handleAddNome = () => {
        if(nome){
            setListNome(list => [...list, nome]);
            setNome('');
        }
    }

    return (<form className={style.participante_body}>
        <h2 className={style.participante_title}>Vamos começar!</h2>
        <div className={style.participante_add_input}>
            <div className={style.participante_input}>
                <MdPersonAdd className={style.participante_input_image} style={ nome ? { color: "white" } : undefined} />
                <input type='text' value={nome} placeholder='Insira os nomes dos participantes' name='participante' onChange={e => setNome(e.target.value)}/>
            </div>
            <button type='button' className={style.participante_add} onClick={handleAddNome}>Adicionar</button>
        </div>
        <ul className={style.participante_names}>
            {listNome.slice(listNome.length > 4 ? listNome.length - 4 : 0, listNome.length).reverse().map((l,i) => (
                <li key={i}>{l}</li>
            ))}
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