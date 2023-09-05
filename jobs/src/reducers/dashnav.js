import { EXPAND, CLOSE } from "../constants/types";

const initialState = {
  expanded: true,
};

const expandedReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPAND:
      return { ...state, expanded: true };
    case CLOSE:
      return { ...state, expanded: false };
    default:
      return state;
  }
};

export default expandedReducer;
