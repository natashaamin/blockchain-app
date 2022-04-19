import { createContext } from "react";

export const ThemeContext = createContext();

export const initialState = {
    darkMode: false
}

export const themeReducer = (state, action) => {
    switch(action.type) {
        case "LIGHT":
            return { darkMode: false };
        case "DARK":
            return { darkMode: true };
        default:
            return state;
    }
}