// import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"


// import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
// import type { Gif } from "./gifs/interfaces/gif.interface"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const { gifs, previousTerms, handlTermClicked, handleSearch } = useGifs();

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
