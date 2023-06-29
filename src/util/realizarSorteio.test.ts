import realizarSorteio from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {

    const participantes = [
        "Affonso",
        "Maria",
        "Luiz",
        "João",
        "Juliana",
        "Fernanda",
    ]
    test('cada participante não sorteie o próprio nome', () => {
        const sorteio = realizarSorteio(participantes);
        participantes.forEach(p => {
            const amigoSecreto = sorteio.get(p);
            expect(amigoSecreto).not.toEqual(p);
        });    
    })
});