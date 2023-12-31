import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import Sorteio from ".";
import { useResultadoSorteio } from "../../state/hook/useResultadoSorteio";

jest.mock('../../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
});

jest.mock('../../state/hook/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }
});

describe('na pagina de sorteio', () => {
    const participantes = ['Ana', 'Catarina', 'Josefina'];

    const resultado = new Map([
        ['Ana', 'Catarina'],
        ['Josefina', 'Ana'],
        ['Catarina', 'Josefina']
    ]);

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
    });

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const selectParticipantes = screen.queryAllByRole('option');
        expect(selectParticipantes).toHaveLength(participantes.length + 1);
    });

    test('o amigo secreto é exibido quando solicitado', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const select = screen.getByPlaceholderText('Selecione o seu nome')

        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const button = screen.getByRole('button')

        fireEvent.click(button)

        const amigoSecreto = screen.getByRole('alert');

        expect(amigoSecreto).toBeInTheDocument()
    })
});