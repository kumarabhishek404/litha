import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { customTheme } from '../lib/theme';

export const useTheme = () => {
    const themeType = useContext(ThemeContext) || 'light';
    // console.log("themeType", themeType);
    const theme = customTheme[themeType]
    return [theme, themeType]
}

export default useTheme;