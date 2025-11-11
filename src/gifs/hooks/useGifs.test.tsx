import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from '../actions/get-gifs-by-query.action';



describe('useGifs', () => {


    test('should return default valus and methods', () => {

        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handlTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {

        const { result } = renderHook(() => useGifs());

        //hay que controlar la informacion
        await act(async () => {
            await result.current.handleSearch('goku');
        })


        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermCliked is called', async () => {

        const { result } = renderHook(() => useGifs());

        //hay que controlar la informacion
        await act(async () => {
            await result.current.handlTermClicked('goku');
        })


        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs from cache', async () => {

        const { result } = renderHook(() => useGifs());

        //hay que controlar la informacion
        await act(async () => {
            await result.current.handlTermClicked('goku');
        });


        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery') // lo hemos utilizado porque llammos a un metodo en vez de un objeto
            .mockRejectedValue(new Error('this is my custom error'));

        await act(async () => {
            await result.current.handlTermClicked('goku');
        });

        expect(result.current.gifs.length).toBe(10);
    })

    test('should return no more than 8 previous terms', async () => {

        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]); // lo hemos utilizado porque llammos a un metodo en vez de un objeto

        await act(async () => {
            await result.current.handleSearch('goku1');
        });
        await act(async () => {
            await result.current.handleSearch('goku2');
        });
        await act(async () => {
            await result.current.handleSearch('goku3');
        });
        await act(async () => {
            await result.current.handleSearch('goku4');
        });
        await act(async () => {
            await result.current.handleSearch('goku5');
        });
        await act(async () => {
            await result.current.handleSearch('goku6');
        });
        await act(async () => {
            await result.current.handleSearch('goku7');
        });
        await act(async () => {
            await result.current.handleSearch('goku8');
        });
        await act(async () => {
            await result.current.handleSearch('goku9');
        });

        console.log(result.current.previousTerms);
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
            'goku9',
            'goku8',
            'goku7',
            'goku6',
            'goku5',
            'goku4',
            'goku3',
            'goku2'
        ])
    })
})