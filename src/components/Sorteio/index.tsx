import style from './Sorteio.module.css';
import { BsFillDice5Fill } from 'react-icons/bs';
import Aviao from '../../assets/Avião-papel 1.svg';
import { useState } from 'react';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio';

const Sorteio = () => {

    const [ selected, setSelected ] = useState<string>("");
    const [winner, setWinner] = useState<string>("");
    const listNome = useListaDeParticipantes();

    const resultadoSorteio = useResultadoSorteio();

    const handleSelect = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(selected){
            setWinner(resultadoSorteio.get(selected)!);
        }
    }

    return (<form className={style.sorteio_body} onSubmit={e => handleSelect(e)}>
        <h2 className={style.sorteio_title}>Quem vai tirar o papelzinho?</h2>
        <select className={style.sorteio_select} onChange={e => setSelected(e.target.value)} value={selected} placeholder='Selecione o seu nome'>
            <option>Selecione seu nome</option>
            {listNome.map((l, i) => (
                <option key={i} value={l}>{l}</option>
            ))}
        </select>

        <p className={style.sorteio_info}>Clique em em sortear para ver quem é seu amigo secreto!</p>

        <div className={style.sorteio_button_body}>
            <div className={style.sorteio_button_img_body}>
                <BsFillDice5Fill className={style.sorteio_button_img}/>
            </div>
            <button type='submit' className={style.sorteio_button}>Sortear!</button>
        </div>

        <p className={style.sorteio_winner} role='alert'>{winner ? winner : ""}</p>
        <img src={Aviao} alt='Avião' className={style.sorteio_aviao_img}/>
    </form>);
}

export default Sorteio;