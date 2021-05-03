
import { combineReducers } from 'redux';
import { DEFAULT_LANGUAGE } from '../../lib/config';
import { LanguageSet } from '../../translations/LanguageSet';
import globalReducer from './globalReducer';
import profileRecider from './profileReducer';
import languageReducer from './reducer';

export const initialState = {
    // locale: LanguageSet[DEFAULT_LANGUAGE],
    language: DEFAULT_LANGUAGE,
    auth: false
}

const rootReducer = combineReducers({
    language: languageReducer,
    store: globalReducer,
    profile: profileRecider
})

export default rootReducer;