import { useEffect, useState } from "react";

interface Props {
    placeholder?: string
    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = ' Buscar', onQuery }: Props) => {
    //esto es una pieza de estado para el searchBar
    const [query, setQuery] = useState('');

    //siempre usar el use juntos
    //lso efectos son jodidos... saltan nada mas montarse, es mejor separar los efectos si tenemos muchos
    //obligado como segundo elemento exponer la dependencia.
    //la dependencia es [query, onQuery]
    useEffect(() => {

        //Debounce
        const timeoutId = setTimeout(() => {
            onQuery(query)
        }, 700)
        // onQuery(query);

        //funcion de retorno 
        return () => {
            clearTimeout(timeoutId);
        };

    }, [query, onQuery])

    const handleSearch = () => {
        onQuery(query);
        // setQuery('')
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-container">
            <input type="text" placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearch}
            >Buscar</button>
        </div>
    )
}
