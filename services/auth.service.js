import { Get, Post, Patch } from "../lib/request"

/** -------------------------- Admin ----------------------------- */

/**
 * @description method to call login post api for admin
 * @author Abhishek
 * @date 15/04/2021
 * @param payload: Object- { email: string, password: String}
 */
export const loginAdminApi = (data, headers) => {
    return Post('/litha/login', data, headers)
}

/**
 * @description method to call logout api for admin 
 * @author Abhishek
 * @date 15/04/2021
 * @return {*} 
 */
export const logoutAdminApi = (data, headers) => {
    return Post('/litha/logout', data, headers)
}


/** -------------------------- User ----------------------------- */

export /**
 * @description method to call guest api for user
 * @author Abhishek
 * @date 20/04/2021
 * @param data Object{ deviceid: ""}
 * @return {*} 
 */
const guestUserApi = (data) => {
    return Post('/guest/login', data)
}

/**
 * @description method to call login post api for user
 * @author jagannath
 * @date 11/04/2021
 * @param payload: Object- { email: String, password: String}
 */
export const loginUserApi = (data, headers) => {
    return Post('/user/login', data, headers)
}

/**
 * @description method to call logout post api for user
 * @author Abhishek
 * @date 15/04/2021
 * @param 
 */
export const logoutUserApi = (data, headers) => {
    return Post('/user/logout', data, headers)
}

/**
 * @description method to call post api for user signup
 * @author Abhishek
 * @date 15/04/2021
 * @param payload: Object- { firstName: String, lastName: String, email: String, password: String, phoneNumber: String}
 */
export const registerUserApi = (data, headers) => {
    return Post('/user/signup', data, headers)
}


/**
 * @description method to check the email existance 
 * @author Abhishek
 * @date 27/04/2021
 * @param data String
 * @param headers String
 */
 export const isEmailExist = (data, headers) => {
    return Get(`/user/email_validate?email=${data}`, headers)
}

/**
 * @description method to get the profile data
 * @author Abhishek
 * @date 28/04/2021
 * @param data String
 * @param headers String
 */
export const getProfileData = (data, headers) => {
    console.log(data, headers, 'auth.service');
    return Get(`/profile?${data}`, headers)
}

/**
 * @description patch method to edit profile data
 * @author Abhishek
 * @date 28/04/2021
 * @param data payload data
 * @param headers token
 * @return {*} 
 */
export const editProfileData = (data, bodyData, headers) => {
    return Patch(`/profile?${data}`, bodyData, headers)
}