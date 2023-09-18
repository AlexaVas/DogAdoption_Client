
import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useFilteredDogsContext } from "../context/filter.context";




function Filter (props) {

 const {
   filteredDogs,
   setFilteredDogs,
   dogs,
   filteredLocation,
   isPuppy,
   setIsPuppy,
   isAdult,
   setIsAdult,
   isSenior,
   setIsSenior
 } = useFilteredDogsContext();

  

  const sortOptions = [
    { name: "Puppies", isSelected: false },
    { name: "Adults", isSelected: false },
    { name: "Seniors", isSelected: false },
  ];

   
  const filter = () => {


    if(filteredLocation){

        setFilteredDogs((dogs) =>
        dogs.filter(
          (dog) => dog.location === filteredLocation
        )  
      );
      
      

    }

    
    
      if (isPuppy) {
        setFilteredDogs((filteredDogs) =>
          filteredDogs.filter((dog) => dog.age <= 2)
        );
      }
      
      if (
      isAdult
    ) {
      setFilteredDogs((filteredDogs) =>
        filteredDogs.filter(
          (dog) => dog.age > 2 && dog.age < 6)
      );
    }
    
    if (
      isSenior
    ){
        setFilteredDogs(() =>
          filteredDogs.filter((dog) => dog.age >= 6)
        );


    }
      
  };

  const startFilteringProcess = () => {
        setFilteredDogs(dogs);
         filter();
        

  }

  const handleSelected = (index) => {

    (sortOptions[index].name === "Puppies" && isPuppy) && setIsPuppy(false);
   (sortOptions[index].name === "Puppies" && !isPuppy) && (setIsPuppy(true), setIsAdult(false), setIsSenior(false));


    (sortOptions[index].name === "Adults" && isAdult) && setIsAdult(false);
    sortOptions[index].name === "Adults" && !isAdult && (setIsAdult(true),
      setIsPuppy(false), setIsSenior(false));

    (sortOptions[index].name === "Seniors" && isSenior) && setIsSenior(false);
    sortOptions[index].name === "Seniors" && !isSenior && (setIsSenior(true), setIsAdult(false), setIsPuppy(false));

       
     
    
    
  };

  useEffect(()=>{

    startFilteringProcess();

  },[isAdult,isPuppy, isSenior]);


 




  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-end pb-5 pt-5">
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option, index) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <p
                            className={classNames(
                              (option.name === "Puppies" && isPuppy)? "font-medium text-gray-900":"text-gray-500",
                                 (option.name === "Adults" && isAdult)? "font-medium text-gray-900":"text-gray-500",
                                    (option.name === "Seniors" && isSenior)? "font-medium text-gray-900":"text-gray-500",
        
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                            onClick={() => {
                              handleSelected(index);
                            }}>
                            {option.name}
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Filter;