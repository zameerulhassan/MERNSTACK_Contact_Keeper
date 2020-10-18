import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
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
    current: null,
    filtered:null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  // const getContacts = async () => {
  //   try {
  //     const res = await axios.get('/api/contacts');

  //     dispatch({
  //       type: GET_CONTACTS,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: CONTACT_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  //ADD CONTACT
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //DELETE
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //SET CURRENT CONTACT
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //UPDATE
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //FILTER CONTACTS
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        current: state.current,
        setCurrent,
        clearCurrent,
        updateContact,
        filtered:state.filtered,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
