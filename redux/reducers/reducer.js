// eslint-disable-next-line no-unused-vars
import * as actionTypes from "../actionTypes";
import { DEFAULT_LANGUAGE } from "../../lib/config";
import { updateObject } from "../../shared/utility";
import { LanguageSet } from "../../translations/LanguageSet";
import { getCookie } from "../../lib/session";


const languages = LanguageSet;
const auth = getCookie('isAuthenticate')
const isAuth = (auth == 'true');
console.log(isAuth, "reducer");

export const initialState = {
  language: DEFAULT_LANGUAGE,
  locale: LanguageSet[DEFAULT_LANGUAGE],
  auth: isAuth || false
};

console.log(initialState.auth);

const updateLocale = (state, action) => {
  return updateObject(state, {
    locale: languages[action.selectedLang],
    language: action.selectedLang,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_LANGUAGE_CHANGE:
      return updateLocale(state, action);
      
    default:
      return state;
  }
};

export default reducer;
