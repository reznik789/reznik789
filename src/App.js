import React, { useReducer, useEffect } from "react";
import "./App.css";
import dataProvider from "./utils/dataProvider";

const UPDATE_DATA = "UPDATE_DATA";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_DATA: {
      const {
        temperature = "N/A",
        pressure = "N/A",
        humidity = "N/A"
      } = action.payload;
      return {
        ...state,
        temperature,
        pressure,
        humidity
      };
    }
    default:
      throw new Error("Unknown action type: " + action.type);
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, {
    temperature: "N/A",
    pressure: "N/A",
    humidity: "N/A"
  });

  useEffect(() => {
    const subscription = dataProvider.subscribe(data => {
      dispatch({
        type: UPDATE_DATA,
        payload: data
      });
    });
    return () => subscription.unsubscribe();
  }, []);

  const { temperature, pressure, humidity } = data;

  return (
    <div className="dasboard">
      <ul>
        <li>
          Temprature: <span data-testid="temp-val">{temperature}</span>
        </li>
        <li>
          Air pressure: <span data-testid="press-val">{pressure}</span>
        </li>
        <li>
          Humidity: <span data-testid="hum-val">{humidity}</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
