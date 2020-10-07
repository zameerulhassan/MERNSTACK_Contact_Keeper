import React, { useReducer } from "react";
import uuid from "uuid";
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
        phoe: "324-4343-56-789",
        type: "professional",
      },
      {
        id: 2,
        name: "maani",
        email: "maani@gmail.com",
        phoe: "111-3333-56-222",
        type: "professional",
      },
      {
        id: 3,
        name: "bullah",
        email: "bullah@gmail.com",
        phoe: "333-4343-56-333",
        type: "professional",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //ADD CONTACT

  //DELETE

  //SET CURRENT CONTACT

  //CLEAR CURRENT CONTACT

  //UPDATE

  //FILTER CONTACTS

  //CLEAR FILTER

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
