import { AGREEMENT } from "../actionTypes";

    export const setAgrement = (data) => {

        return {
            type: AGREEMENT,
            payload: data
        };

    };