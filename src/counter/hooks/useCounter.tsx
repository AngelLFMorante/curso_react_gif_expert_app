//los hook tienen que ir agregado lso archivos con el prefijo 'use'

import { useState } from "react";

//esto es un custom Hook
export const useCounter = (initialValue: number = 10) => {

    //no se recomienda hacer hook con condicionales, malas practicas.
    //los hooks son funciones anonimas 
    //los hooks dependen de la posicion
    //primero los useState y luego los efectos
    const [counter, setCounter] = useState(initialValue);

    const handleAdd = () => {
        setCounter(counter + 1);
    }

    //hay veces que no vamos a poder contar con el counter y se puede hacer tambien haciendo callback
    const handleSubstract = () => {
        setCounter((prevState) => prevState - 1);
    }

    const handleReset = () => {
        setCounter(initialValue);
    }

    //lo suyo es tener un objeto pero se puede devolver lo que quieras
    return {
        //se separa en 2:

        //properties , values
        counter,

        //metodos o acciones
        handleAdd,
        handleSubstract,
        handleReset
    }
}
