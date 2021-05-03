import { DEFAULT_LANGUAGE } from "../../lib/config"
import { LanguageSet } from "../../translations/LanguageSet"
import { APP_TITLE, IS_MOBILE, LANG, THEME, THEME_CHANGE, IS_LOADING, TOGGLE_DROPDOWN } from "../actionTypes"

const initialState = {
    appTitle: "Chat Module",
    theme: 'light',
    isMobile: false,
    isLoading: false,
    locale: LanguageSet[DEFAULT_LANGUAGE],
    language: DEFAULT_LANGUAGE,
    isDropdownOpen: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_TITLE:
            return {
                ...state,
                appTitle: action.payload
            }
        case THEME:
            return {
                ...state,
                theme: action.payload
            }
        case IS_MOBILE:
            return {
                ...state,
                isMobile: action.payload
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case LANG:
            return {
                ...state,
                lang: action.payload
            }
        case THEME_CHANGE:
            return {
                ...state,
                theme: action.payload
            }
        case TOGGLE_DROPDOWN:
            return {
                ...state,
                isDropdownOpen: action.payload
            }
        default:
            return state;
    }
}
export default globalReducer;