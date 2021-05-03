import React, { useContext } from 'react'
import LangContext from '../context/language'

/**
 * @date 06/04/2021
 * @author Abhishek
 * @description use this hook to get all translations & language
 * @return [lang: {}, langCode: String]
 */
const useLang = () => {
    const {langCode="en", lang={}} = useContext(LangContext);
    return [lang, langCode];
}

export default useLang;