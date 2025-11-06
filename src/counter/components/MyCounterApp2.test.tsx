import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

//vamos a mockear el useCounter
import { useCounter } from "../hooks/useCounter";

//hacemos la llamada al handle, porque desde el mock es una referencia y no se pude
const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
    //hay que desectrucurar la funcion y por eso poner la funcion de flecha
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock,
        handleReset: handleResetMock
    })
}))

describe('MyCounterApp', () => {

    test('should render the component', () => {
        render(<MyCounterApp />);

        screen.debug();

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
            `counter: 20`
        )

        //controlamos que tenga todo definido como en el componente
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    })

    test('should call handleAdd if button is clicked', () => {
        render(<MyCounterApp />);

        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleSubstractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();

    })

})
