import {PROFILE} from '../actionTypes'

const initialState = {
    auth: false,
    username: '3Embed',
    profileData: { }
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH":
            return {
                ...state,
                auth: action.payload
            }
        case "USERNAME":
                return {
                    ...state,
                    username: action.payload
                }
        case "PROFILE":
            console.log(action.payload, "payload");
                return {
                    ...state,
                    profileData: action.payload
                }
        default:
            return state;
    }
}
export default profileReducer;