import Cookies from "js-cookie";

    /**
     * @description method to set localstorage
     * @author Jagannath
     * @date 2020-10-28
     * @param key key name
     * @param value value
     */
    export const setLocalStorage = (key, value) => {
        return localStorage.setItem(key, value);
    }
    
    /**
     * @description method to get a key from localstorage
     * @author Jagannath
     * @date 2020-10-28
     * @param key key name
     */
    export const getLocalStorage = (key) => {
        // return localStorage.getItem(key);
    }
    
    /**
     * @description method to clear all localstorage
     * @author Jagannath
     * @date 2020-10-28
     */
    export const clearLocalStorage = () => {
        // return localStorage.clear()
    }
    
    /**
     * @description method to remove a key from localstorage
     * @author Jagannath
     * @date 2020-10-28
     * @param key key name
     */
    export const removeLocalStorageKey = (key) => {
        // return localStorage.removeItem(key)
    }

    /**
     * @description method to set object in localstorage
     * @author Jagannath
     * @date 2020-11-17
     * @param key string
     * @param value object{}
     */
    export const setLocalStorageObj = (key, value) => {
        // return localStorage.setItem(key, JSON.stringify(value));
    }
    
    /**
     * @description method to get object from localstorage
     * @author Jagannath
     * @date 2020-11-17
     * @param key string
     * @returns Object{}
     */
    export const getLocalStorageObj = (key) => {
        // return JSON.parse(localStorage.getItem(key));
    }


// --===================================---

/**
 * @description method to store value in cookie
 * @author Abhishek
 * @date 20/04/2021
 * @param name String
 * @param value String
 * @param value
 */
export const setCookie = (key, value) => {
    return Cookies.set(key, value);
}

/**
 * @description method to get value by name from cookie
 * @author Abhishek
 * @date 20/04/2021
 * @param key String
 */
export const getCookie = (key) => {
    return Cookies.get(key);
}

// remvoe cookie - key


