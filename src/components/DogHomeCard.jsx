'use client';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function DogHomeCard(props) {
    const { name, breed, age, image, description } = props;

  return (
    <li className="relative">
    <div className="group aspect-h-4 aspect-w-5 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
      <img src={props.image} alt={props.name} className="pointer-events-none object-cover group-hover:opacity-75" />
      <button type="button" className="absolute inset-0 focus:outline-none">
        <span className="sr-only">View details for {props.name}</span>
      </button>
    </div>
    <div className="flex items-center justify-between">
    <div>
    <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">{props.name} </p>
    <p className="pointer-events-none block text-md font-regular text-gray-500">{props.breed} • {props.age} years old</p>
    </div>
    <AiOutlineInfoCircle size={24} className="text-gray-500 m-2" />
    </div>
  </li>

  )
}


// grid grid-columns-2 grid-flow-col gap-4
