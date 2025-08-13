const initialState = { count: 0 }; //- Define el estado por defecto del contador. Comienza en 0

const counterReducer = (state = initialState, action) => {//- Define el reducer del contador. Recibe el estado actual y una acción.
    
    switch (action.type) {//- Dependiendo del tipo de acción, se actualiza el estado.
        case 'INCREMENT'://- Si la acción es INCREMENT, se incrementa el contador en 1.
            return { count: state.count + 1 };//-- Si la acción es DECREMENT, se decrementa el contador en 1.
        case 'DECREMENT'://- Si la acción es DECREMENT, se decrementa el contador en 1.
            return { count: state.count - 1 };//-- Si la acción es RESET, se reinicia el contador a 0.
        default://- Si la acción no es reconocida, se retorna el estado actual sin cambios.
            return state;//-- Si la acción no es reconocida, se retorna el estado actual sin cambios.
}};
export default counterReducer;// Exporta el reducer para que pueda ser utilizado en la tienda de Redux.