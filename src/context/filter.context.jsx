/** @format */

import { useState, useContext, createContext } from "react";



const filteredDogsContext = createContext();



export function useFilteredDogsContext(){
return useContext(filteredDogsContext);
}

export function FilteredDogsProvider({children}){

const [filteredDogs, setFilteredDogs] = useState([]);
const [dogs, setDogs] = useState([]);
const [filteredLocation, setFilteredLocation] = useState();

 const [isPuppy, setIsPuppy] = useState(false);
 const [isAdult, setIsAdult] = useState(false);
 const [isSenior, setIsSenior] = useState(false);


return (
  <filteredDogsContext.Provider
    value={{
      isSenior, 
      setIsSenior,
      isAdult,
      setIsAdult,
      isPuppy,
      setIsPuppy,
      filteredDogs,
      setFilteredDogs,
      dogs,
      setDogs,
      filteredLocation,
      setFilteredLocation,
    }}>
    {children}
  </filteredDogsContext.Provider>
);

}











