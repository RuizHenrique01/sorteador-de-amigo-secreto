import style from './Sorteio.module.css';
import { BsFillDice5Fill } from 'react-icons/bs';
import Aviao from '../../assets/Avião-papel 1.svg';
import { useRecoilValue } from 'recoil';
import listaNome from '../../state/atom';
import { useState } from 'react';
import generateRandomPosition from '../../util/generateRandomPosition';

const Sorteio = () => {

    const [ selected, setSelected ] = useState<string>("");
    const [winner, setWinner] = useState<string>("");
    const listNome = useRecoilValue<string[]>(listaNome);

    const handleSelect = () => {
        const winnerPosition = generateRandomPosition(Number(selected), listNome.length);
        console.log(winnerPosition, listNome[winnerPosition])
        setWinner(listNome[winnerPosition]);
    }

    return (<div className={style.sorteio_body}>
        <h2 className={style.sorteio_title}>Quem vai tirar o papelzinho?</h2>
        <select className={style.sorteio_select} onChange={e => setSelected(e.target.value)} >
            <option value="" disabled selected>Selecione seu nome</option>
            {listNome.map((l, i) => (
                <option key={i} value={i}>{l}</option>
            ))}
        </select>

        <p className={style.sorteio_info}>Clique em em sortear para ver quem é seu amigo secreto!</p>

        <div className={style.sorteio_button_body}>
            <div className={style.sorteio_button_img_body}>
                <BsFillDice5Fill className={style.sorteio_button_img}/>
            </div>
            <button className={style.sorteio_button} onClick={handleSelect}>Sortear!</button>
        </div>

        <p className={style.sorteio_winner}>{winner ? winner : ""}</p>
        <img src={Aviao} alt='Avião' className={style.sorteio_aviao_img}/>
    </div>);
}

export default Sorteio;