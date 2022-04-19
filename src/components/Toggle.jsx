import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import LocalicationContext from "../context/LocalizationContext";
import "./Toggle.css";

export default function Toggle() {
  const theme = useContext(ThemeContext);
  const { t, i18n } = useContext(LocalicationContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) {
      i18n.changeLanguage("en");
      theme.dispatch({ type: "LIGHT" });
    } else {
      i18n.changeLanguage("th");
      theme.dispatch({ type: "DARK" });
    }
  };

  return (
    <div class="flex items-center justify-center py-1 px-3 mx-4">
      <label for="toggleB" class="flex items-center cursor-pointer">
        <div class="relative">
          <input type="checkbox" id="toggleB" class="sr-only" onClick={onClick}/>
          <div class="block bg-[#2546bd] w-14 h-8 rounded-full"></div>
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" ></div>
        </div>
      </label>
    </div>
  );
}
