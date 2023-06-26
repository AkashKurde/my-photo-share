import { AGREEMENT } from "../actionTypes";

const initialState = {
    agree: false,
  };

const AgreeReducer = (state = initialState, action) => {
    switch (action.type) {
      case AGREEMENT:
        return {
          ...state,
          agree: action.payload,
        };
      default:
        return state;
    }
  };

export default AgreeReducer;