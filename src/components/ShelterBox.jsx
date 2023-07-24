
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import { Combobox } from '@headlessui/react'

// const API_URL = "http://localhost:5008/shelter";

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
//   }


// export default function ShelterBox(props) {
//     const { name, location } = props;

//   const [shelters, setShelters] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/`)
//       .then((response) => {
//         const listShelters = response.data;
//         setShelters(listShelters);
//         console.log(listShelters);
//       })
//       .catch((error) => console.log(error));
//   }, []);


//   const [query, setQuery] = useState('')
//   const [selectedShelter, setSelectedShelter] = useState(null)

//   const filteredShelters =
//     query === ''
//       ? shelters
//       : shelters.filter((shelter) => {
//           return shelter.name.toLowerCase().includes(query.toLowerCase())
//         })

//   return (
//     <Combobox as="div" value={selectedShelter} onChange={setSelectedShelter}>
//       <Combobox.Label className="block text-lg font-medium leading-6 text-gray-900">Choose your city:</Combobox.Label>
//       <div className="relative mt-2">
//         <Combobox.Input
//           className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//           onChange={(event) => setQuery(event.target.value)}
//           displayValue={(shelter) => shelter?.name}
//         />
//         <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//           <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//         </Combobox.Button>

//         {filteredShelters.length > 0 && (
//           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//             {filteredShelters.map((shelter) => (
//               <Combobox.Option
//                 key={shelter.id}
//                 value={shelter}
//                 className={({ active }) =>
//                   classNames(
//                     'relative cursor-default select-none py-2 pl-8 pr-4',
//                     active ? 'bg-blue-600 text-white' : 'text-gray-900'
//                   )
//                 }
//               >
//                 {({ active, selected }) => (
//                   <>
//                     <span className={classNames('block truncate', selected && 'font-semibold')}>{shelter.name}</span>

//                     {selected && (
//                       <span
//                         className={classNames(
//                           'absolute inset-y-0 left-0 flex items-center pl-1.5',
//                           active ? 'text-white' : 'text-blue-600'
//                         )}
//                       >
//                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                       </span>
//                     )}
//                   </>
//                 )}
//               </Combobox.Option>
//             ))}
//           </Combobox.Options>
//         )}
//       </div>
//     </Combobox>
//   )
// }
