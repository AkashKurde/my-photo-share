import { DECREMENT, INCREMENT } from '../actionTypes';


    export const IncrementCount = (data) => {

        return {
            type: INCREMENT,
            payload: data
        };

    };
    export const DecrementCount = (data) => {

        return {
            type: DECREMENT,
            payload: data
        };

    };
