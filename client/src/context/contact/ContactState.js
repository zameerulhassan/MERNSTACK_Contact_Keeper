import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CRRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "mshalay",
        email: "meesha@gmail.com",
        phone: "324-4343-56-789",
        type: "professional",
      },
      {
        id: 2,
        name: "maani",
        email: "maani@gmail.com",
        phone: "111-3333-56-222",
        type: "personal",
      },
      {
        id: 3,
        name: "bullah",
        email: "bullah@gmail.com",
        phone: "333-4343-56-333",
        type: "professional",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //ADD CONTACT
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //DELETE

  //SET CURRENT CONTACT

  //CLEAR CURRENT CONTACT

  //UPDATE

  //FILTER CONTACTS

  //CLEAR FILTER

  return (
    <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
