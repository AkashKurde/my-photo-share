import { SET_CATEGORY } from "../actionTypes"


const initialState = {
    category: ''
}
export default function CategoryReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case SET_CATEGORY:
            return { category: action.payload }
        default:
            return state
    }
}