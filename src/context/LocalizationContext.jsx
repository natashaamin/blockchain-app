import React, { createContext } from "react";

const LocalizationContext = createContext({
    t: (key, data) => {},
    i18n: {}
});
export default LocalizationContext;