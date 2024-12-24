//

// Action type constants
export const SET_USER = "SET_USER";

// Initial state
export const initialState = {
  user: null,
};

// Reducer function
export const _reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
