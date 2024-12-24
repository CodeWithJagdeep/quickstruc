// Action type constants
export const SET_USER = "SET_USER";

// Define types for the user and state
interface User {
  id: string;
  name: string;
}

interface State {
  user: User | null;
}

// Initial state
export const initialState: State = {
  user: null,
};

// Action interface
interface Action {
  type: string;
  payload: User | null;
}

// Reducer function
export const _reducer = (
  state: State = initialState,
  action: Action
): State => {
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
