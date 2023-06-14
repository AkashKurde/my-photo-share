import { SET_CATEGORY } from "../actionTypes";

    export const setCategory = (data) => {

        return {
            type: SET_CATEGORY,
            payload: data
        };

    };