import { SET_USER, CLEAR_USER } from "./types";

const initialState = {
  id: null,
  name: null,
  role: null,
  studentId: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        studentId: action.payload.studentId,
      };
    case CLEAR_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
