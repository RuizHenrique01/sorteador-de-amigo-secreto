import { useSetRecoilState } from 'recoil';
import listaNome from '../atom';


const useAddNome = () => {
    const setLista = useSetRecoilState(listaNome);
    return (nome: string) => {
        return setLista(list => [...list, nome]);
    };
}

export default useAddNome;