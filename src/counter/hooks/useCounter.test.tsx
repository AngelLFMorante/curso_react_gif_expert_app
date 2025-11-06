import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe('useCounter', () => {

    // tambien podemos abstraer el renderHook en un beforeEach
    test('should initialize with default value of 10', () => {

        //utilizar siempre renderHook para los hook
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);

    });

    test('should initialize with default value of 20', () => {

        //utilizar siempre renderHook para los hook
        const { result } = renderHook(() => useCounter(20));

        expect(result.current.counter).toBe(20);

    });

    //se complica cuando hay cambios.. como handleAdd, Substract, Reset
    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());

        //hay que envolverlo wrapper con el act, igualmente sale en los warning de test fallido
        //si hay un async await tambien debemos indicarlo en el act
        act(() => {
            result.current.handleAdd();
        })


        expect(result.current.counter).toBe(11)
    })

    test('should decrement counter when handleSubstract is called', () => {
        const { result } = renderHook(() => useCounter());

        //hay que envolverlo wrapper con el act, igualmente sale en los warning de test fallido
        //si hay un async await tambien debemos indicarlo en el act
        act(() => {
            result.current.handleSubstract();
        })


        expect(result.current.counter).toBe(9)
    })

    test('should reset counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());

        //hay que envolverlo wrapper con el act, igualmente sale en los warning de test fallido
        //si hay un async await tambien debemos indicarlo en el act

        act(() => {
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
        })
        expect(result.current.counter).toBe(5);

        // me aseguro que haya el cambio y el reset
        act(() => {
            result.current.handleReset();
        })
        expect(result.current.counter).toBe(10)
    })
})