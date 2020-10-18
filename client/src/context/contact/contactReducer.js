/**
 * useReducer(reducer,initialState) takes 2 params, reducer as funaction, and initialState, return 2 things; 1- newState 2- dispatch()-to specify the action (to be taken on initialState)
 * reducer(currentState,action) takes 2 params , returns newSate
 */

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
  CONTACT_ERROR,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
      case CONTACT_ERROR:
        return{
          ...state,
          error:action.payload
        }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`,`gi`);
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
      case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
