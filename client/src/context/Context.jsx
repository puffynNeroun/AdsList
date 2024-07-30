import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

const MyContext = createContext()
export const Context = ({children}) => {

  const [ads, setAds] = useState([]);

  const fetchAd = () => {
    axios.get('http://localhost:3001/ads')
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <MyContext.Provider value={{ads, setAds, fetchAd}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext)