/**
 * useReducer(reducer,initialState) takes 2 params, reducer as funaction, and initialState, return 2 things; 1- newState 2- dispatch()-to specify the action (to be taken on initialState)
 * reducer(currentState,action) takes 2 params , returns newSate
 */

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
      case DELETE_CONTACT:
      return {
        ...state,
        contacts:state.contacts.filter(contact=>contact.id!==action.payload)
      };
    default:
      return state;
  }
};
