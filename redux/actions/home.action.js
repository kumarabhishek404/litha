import { IS_MOBILE, THEME_CHANGE } from "../actionTypes"

export const actionThemeChange = (theme) => {
    return {
        type: THEME_CHANGE,
        payload: theme
    }
}

export const setMobileView = (data) => {
    return {
      type: IS_MOBILE,
      payload: data,
    };
};