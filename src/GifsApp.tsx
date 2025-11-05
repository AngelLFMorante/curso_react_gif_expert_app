import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"


import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handlTermClicked = (term: string) => {
        console.log({ term });
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase(); //eliminar espacio y pasamos a lowercase

        if (query.length === 0) return;// que no este vacio

        if (previousTerms.includes(query)) return; //evitar busquedas duplicadas

        setPreviousTerms([query, ...previousTerms].slice(0, 7)); // agregar termino al inicio, limitar a 8 elementos

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);
    }

    return (
        <>
            {/* Header */}
            {/** hemos separado y creado en componente para separar */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el Gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Buscar Gifs"
                onQuery={handleSearch}
            />

            {/* Busquedas previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handlTermClicked} />

            {/* Gifs */}
            <GifList gifs={gifs} />
        </>
    )
}
