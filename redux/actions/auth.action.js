import { INIT_LANGUAGE_CHANGE } from "../actionTypes";

export const setLanguage = (selectedLang) => {
    return {
        type: INIT_LANGUAGE_CHANGE,
        payload: selectedLang,
    };
};