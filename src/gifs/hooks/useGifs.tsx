import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

//caché
// const gifsCache: Record<string, Gif[]> = {};
// hay que tener cuidado de meter objetos que queremos para persistencia porque los hook renderiza de nuevo y se pierde los datos.
// hay que sacarlo del hook o crear un hook especial

//los hook son dispatch por eso al ver que cambia el estaado pues renderiza de nuevo

//tambien podemos usar el useRef

export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    //ahora el gifsCache sus datos ya cambian y no es un array( arreglo) si no que su data es un current

    const handlTermClicked = async (term: string) => {
        //antes de hacer la peticion http
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs;
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase(); //eliminar espacio y pasamos a lowercase

        if (query.length === 0) return;// que no este vacio

        if (previousTerms.includes(query)) return; //evitar busquedas duplicadas

        setPreviousTerms([query, ...previousTerms].slice(0, 8)); // agregar termino al inicio, limitar a 8 elementos

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);

        gifsCache.current[query] = gifs;
    }

    return {
        //properties
        gifs,
        previousTerms,

        //methods
        handlTermClicked,
        handleSearch
    }
}
