import React from 'react'; // Import React
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux

export const Contador = () => {
  const count = useSelector(state => state.count); // Get the current count from Redux store
  const dispatch = useDispatch(); // Get the dispatch function

  return (
    <div>
      <p>Contador: {count}</p> {/* Display the current count */}

      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Incrementar
      </button> {/* Button to increment the count */}

      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrementar
      </button> {/* Button to decrement the count */}
    </div>
  );
};
