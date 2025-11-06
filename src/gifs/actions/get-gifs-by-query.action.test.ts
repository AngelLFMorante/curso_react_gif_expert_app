import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";


describe('getGifsByQuery', () => {

    //aqui hay pruebas asincronas con promesas
    test('should return a list of gifs', async () => {
        //como es una function async debemos indicarlo async()

        const gifs = await getGifsByQuery('goku');

        //con el console log hemos cogido los datos del gif y hemos creado una carpeta test
        //dentro de la carpeta test creamos un folder mock and file gifs.data para trabajar con los datos
        console.log(gifs);

        const [gif] = gifs;

        //con el to Equal tambien funciona, pero ya sabemos que lo mejor es el toStrictEquals
        expect(gif).toEqual({
            id: expect.any(String),
            height: expect.any(Number),
            width: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String),
        })
    })


});