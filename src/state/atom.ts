import { atom } from "recoil";


const listaNome = atom<string[]>({
    key: 'listaNome',
    default: []
});

export default listaNome;