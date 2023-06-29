import { useSetRecoilState } from 'recoil';
import { listaParticipantes } from '../atom';


const useAddNome = () => {
    const setLista = useSetRecoilState(listaParticipantes);
    return (nome: string) => {
        return setLista(list => [...list, nome]);
    };
}

export default useAddNome;