import { collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';

const DataContext = createContext({
  contactData: [],
  setContactData: () => {},
  filteredContactData: [],
  setFilteredContactData: () => {},
  removeContact: (id) => {},
});

const DataContextProvider = ({ children }) => {
  const [contactData, setContactData] = useState([]);
  const [filteredContactData, setFilteredContactData] = useState();
// UseEffect for getting all Data for listing
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('contactData'));

    if (storageData !== contactData) {
      const unsub = onSnapshot(
        // argument 1
        collection(db, 'people'),
        // argument 2
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setContactData(list);
          setFilteredContactData(list);
          localStorage.setItem('contactData', JSON.stringify(list));
        },
        // argument 3
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
    }
  }, []);

  // DELETE CONTACT
  const removeContactHandler = async (id) => {
    if (window.confirm('Are you sure to Delete this contact')) {
      try {
        await deleteDoc(doc(db, 'people', id));
        setFilteredContactData(contactData.filter((user) => user.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const context = {
    contactData: contactData,
    setContactData: setContactData,
    removeContact: removeContactHandler,
    filteredContactData: filteredContactData,
    setFilteredContactData: setFilteredContactData,
  };

  return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
};

const useContactData = () => useContext(DataContext);
export { useContactData, DataContextProvider };
