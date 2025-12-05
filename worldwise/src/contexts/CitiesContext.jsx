import { useReducer } from "react";
import { useContext, useState, useEffect } from "react";
import { createContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "is-loading":
      return {
        ...state,
        isLoading: action.payload,
      };
      break;
    case "get-cities":
      return {
        ...state,
        cities: action.payload,
      };
      break;
    case "add-city":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
      break;
    case "delete-city":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
      break;
    case "get-city":
      return {
        ...state,
        currentCity: action.payload,
      };
      break;
    default:
      throw new Error("Action does not happen");
      break;
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  async function getCity(id) {
    try {
      dispatch({ type: "is-loading", payload: true });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "get-city", payload: data });
    } catch (err) {
      alert(err);
    } finally {
      dispatch({ type: "is-loading", payload: false });
    }
  }

  async function addCity(newCity) {
    try {
      dispatch({ type: "is-loading", payload: true });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "add-city", payload: data });
    } catch (err) {
      alert(err);
    } finally {
      dispatch({ type: "is-loading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "is-loading", payload: true });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "delete-city", payload: id });
    } catch (err) {
      alert(err);
    } finally {
      dispatch({ type: "is-loading", payload: false });
    }
  }

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "is-loading", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "get-cities", payload: data });
      } catch (err) {
        alert(err);
      } finally {
        dispatch({ type: "is-loading", payload: false });
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Use context outside the provider");
  return context;
}

export { useCities, CitiesProvider };
