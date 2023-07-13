import { UPLOAD_COMPLETE } from "../actionTypes";

const initialState = {
    toggleFlag: false,
  };
  
  const UploadCompReduer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_COMPLETE:
        return {
          ...state,
          toggleFlag: !state.toggleFlag,
        };
      default:
        return state;
    }
  };

export default UploadCompReduer