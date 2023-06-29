import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Participantes from ".";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import { act } from "react-dom/test-utils";

jest.mock('../../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
});

const mockNavigate = jest.fn()
const mockSorteador = jest.fn()

jest.mock('../../state/hook/useSorteador', () => {
    return{
        useSorteador: () => mockSorteador
    }
})

jest.mock('react-router-dom', () => {
    return{
        useNavigate: () => mockNavigate
    }
})

// Formulario

describe('o comportamento do Formulario.tsx', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    });
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render(
            <RecoilRoot>
                <Participantes />
            </RecoilRoot>)
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByTestId('addParticipante');
        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    })
    
    test('adicionar um participante caso exista um nome preenchido', () => {
        render(
            <RecoilRoot>
                <Participantes/>
            </RecoilRoot>)
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByTestId('addParticipante');
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        // garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
        // garantir que o input não tenha um valor
        expect(input).toHaveValue("")
    })
    
    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Participantes />
            </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByTestId('addParticipante');
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
    
        const mensagemDeErro = screen.getByRole('alert')
    
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('a mensagem de erro deve sumir após os timers', () => {
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Participantes />
            </RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByTestId('addParticipante');
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        let mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeInTheDocument()
    
        act(() => {
            jest.runAllTimers()
        });
    
        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
    })
})


// Lista

describe("Uma lista vazia de participantes", () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    });
    test('deve ser renderizado sem elementos', () => {
        render(
            <RecoilRoot>
                <Participantes />
            </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(0)
    })

});

describe("Uma lista preenchida de participantes", () => {
    const participantes = ['Ana', 'Catarina']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    });
    test('deve ser renderizado 2 elementos', () => {
        render(
            <RecoilRoot>
                <Participantes />
            </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(participantes.length)
    })

});

// Rodape

describe('onde não existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    });
    test('A brincadeira não deve ser iniciada', ()=>{
        render(<RecoilRoot>
            <Participantes />
        </RecoilRoot>)

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    })
})

describe('onde existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina'])
    });
    test('A brincadeira deve ser iniciada', ()=>{
        render(<RecoilRoot>
            <Participantes />
        </RecoilRoot>)

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
    })
    test('Deve ser redirecionado para a pagina de sorteio', () => {
        render(<RecoilRoot>
            <Participantes />
        </RecoilRoot>)

        const button = screen.getByRole('button');
        fireEvent.click(button)
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toBeCalledWith('/sorteio');
        expect(mockSorteador).toHaveBeenCalledTimes(1);
    })
})

