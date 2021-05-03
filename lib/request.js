import Axios from 'axios';
import * as config from './config';
import { getLocalStorage } from './session';

// if (typeof window !== "undefined") {


const LANG = getLocalStorage('lang') || 'en';
const getUrl = (endpoint) => {
    return config.API_HOST + endpoint;
}

/**getUrl
 * @description POST method to call post api (without token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const Post = async(endpoint, data, headers) => {
    return Axios.post(getUrl(endpoint), data, {
        headers: { 
            'Content-Type': 'application/json',
            'language': LANG || 'en',
            'Authorization' : headers || ''
        }
    })
}

/**
 * @description GET method to call get api (without token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param headers token
 */
export const Get = async(endpoint, headers) => {
    return Axios.get(getUrl(endpoint), {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en',
            'Authorization' : headers || ''
        }
    })
}


/**
 * @description Patch method to call patch api
 * @author Abhishek
 * @date 28/04/2021
 * @param endpoint endpoint for api
 * @param headers token
 */
export const Patch = async(endpoint, data, header) => {
    return Axios.patch(getUrl(endpoint), data, {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en',
            'Authorization' : header || ''
        }
    })
}

/**
 * @description POST method to call post api (with basic auth)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 */
export const PostWithBasicAuth = async(endpoint) => {
    Axios.token.headers.common['authorization'] = await config.BASIC_AUTH;
    return Axios.post(getUrl(endpoint), {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}

/**
 * @description POST method to call post api (with token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PostWithToken = async(endpoint, data) => {
    Axios.defaults.headers.common['authorization'] = await getLocalStorage('token');
    return Axios.post(getUrl(endpoint), data, {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}

/**
 * @description GET method to call get api (with token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 */
export const GetWithToken = async(endpoint) => {
    Axios.defaults.headers.common['authorization'] = await getLocalStorage('token');
    return Axios.get(getUrl(endpoint), {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}


/**
 * @description PATCH method to call patch api (with token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PatchWithToken = async(endpoint, data) => {
    Axios.defaults.headers.common['authorization'] = await getLocalStorage('token');
    return Axios.patch(getUrl(endpoint), data, {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}

/**
 * @description PUT method to call put api (with token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PutWithToken = async(endpoint, data) => {
    Axios.defaults.headers.common['authorization'] = await getLocalStorage('token');
    return Axios.put(getUrl(endpoint), data, {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}


/**
 * @description DELETE method to call delete api (with token)
 * @author Jagannath
 * @date 2020-11-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const DeleteWithToken = async(endpoint, data) => {
    Axios.defaults.headers.common['authorization'] = await getLocalStorage('token');
    return Axios.delete(getUrl(endpoint), data, {
        headers: {
            'Content-Type': 'application/json',
            'language': LANG || 'en'
        }
    })
}

// }