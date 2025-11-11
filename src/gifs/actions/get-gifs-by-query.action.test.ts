import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from '../../../tests/mock/giphy.response.data';

//mock


describe('getGifsByQuery', () => {

    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        // en vez de tener un reset lo cambiamos a que sea una nueva instancia
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });
    //aqui hay pruebas asincronas con promesas
    // test('should return a list of gifs', async () => {
    //     //como es una function async debemos indicarlo async()

    //     const gifs = await getGifsByQuery('goku');

    //     //con el console log hemos cogido los datos del gif y hemos creado una carpeta test
    //     //dentro de la carpeta test creamos un folder mock and file gifs.data para trabajar con los datos
    //     console.log(gifs);

    //     const [gif] = gifs;

    //     //con el to Equal tambien funciona, pero ya sabemos que lo mejor es el toStrictEquals
    //     expect(gif).toEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //     })
    // })

    //instalamos dependencias : npm install axios-mock-adapter --save-dev
    test('should return a lift of gifs', async () => {
        //hay que configurar el mock 
        //se peude reescribir la respuesta
        //hemos cogido la data de response de postman y esta en test data
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('goku');

        console.log(gifs);
        expect(gifs.length).toBe(10);

        //recorremos y comprobamos
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        })

    });


    test('should return an empty list of gifs if query is empty, async', async () => {

        // mock.onGet('/search').reply(200, giphySearchResponseMock);
        //reestablece  toda la instancia y deshecha todo lo que haya hecho en axios
        mock.restore();

        const gifs = await getGifsByQuery('goku');

        console.log(gifs);
        expect(gifs.length).toBe(10);

    });

    test('should handle error when the API returns an error', async () => {
        //COmo saber si es un spy : cuando algo tiene que ser llamado de alguna manera, mock: es una function ficticia 
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {
                //aqui podemos hacer cosas
            });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        });

        const gifs = await getGifsByQuery('goku');
        //cuidado porque a veces al mantener la const general, no nos hace los cambios, con lo que cambiamos a let el mock
        console.log(gifs);

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    });



});