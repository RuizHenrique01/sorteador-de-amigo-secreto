import { render, screen } from "@testing-library/react"
import Formulario from "./index";


test('Quando o input estiver vazio o usuáio não pode ser cadastrado', () => {
    render(<Formulario/>)

    const input = screen.getByPlaceholderText("Insira os nomes dos participantes");

    const botao = screen.getByRole('button');

    expect(input).toBeInTheDocument()
    expect(botao).toBeDisabled()
})