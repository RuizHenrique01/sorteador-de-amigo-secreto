import style from './Participantes.module.css';
import { MdPersonAdd } from 'react-icons/md'
import { BsPlayCircle } from 'react-icons/bs';
import Compras from '../../assets/Wavy Buddies Shopping Bags.svg';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useAdicionarParticipante } from '../../state/hook/useAdicionarParticipante';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useMensagemDeErro } from '../../state/hook/useMensagemDeErro';
import { useSorteador } from '../../state/hook/useSorteador';

const Participantes = () => {

    const [nome, setNome] = useState<string>("");
    const listNome = useListaDeParticipantes();
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null);

    const addParticipante = useAdicionarParticipante();

    const mensagemDeErro = useMensagemDeErro();

    const ruffle = useSorteador();

    const handleAddNome = () => {
        addParticipante(nome);
        setNome("");
        inputRef.current?.focus();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        ruffle();
        navigate('/sorteio');
    }

    return (<form className={style.participante_body} onSubmit={event => handleSubmit(event)}>
        <h2 className={style.participante_title}>Vamos começar!</h2>
        <div className={style.participante_add_input}>
            <div className={style.participante_input}>
                <MdPersonAdd className={style.participante_input_image} style={nome ? { color: "white" } : undefined} />
                <input ref={inputRef} type='text' value={nome} placeholder='Insira os nomes dos participantes' name='participante' onChange={e => setNome(e.target.value)} />
            </div>
            <button
                disabled={!nome}
                type="button"
                className={style.participante_add}
                onClick={e => handleAddNome()}
                data-testid='addParticipante'
                role='none'>Adicionar</button>
        </div>

        {mensagemDeErro && <p role="alert" className={style.participante_error_message}>{mensagemDeErro}</p>}

        <ul className={style.participante_names}>
            {listNome.slice(listNome.length > 4 ? listNome.length - 4 : 0, listNome.length).reverse().map((l, i) => (
                <li key={i}>{l}</li>
            ))}
        </ul>

        <div className={style.participante_send_foot}>
            <div className={style.participante_send_button}>
                <BsPlayCircle className={style.participante_send_img} />
                <button type='submit' className={style.participante_send} disabled={listNome.length < 3}>Iniciar bricandeira!</button>
            </div>
            <img src={Compras} alt='Compras do participante' className={style.participante_buy_img} />
        </div>
    </form>);
}

export default Participantes