import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  UserIcon,
  HomeIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const loginTypes = [
  { name: 'Individual', description: `I'm looking for a dog`, href: '/login', icon: UserIcon },
  { name: 'Shelter', description: 'Manage list of dogs', href: '/shelter', icon: HomeIcon },
]

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  if (!user) {
    return (
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex">
            <Link to="/">

                <img className="h-8 w-auto" src="/src/assets/fullLogo.svg" alt="" />

            </Link>
          </div>

          {!isLoggedIn && (
            <>

        <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Log in
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loginTypes.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link to={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
            </>
          )}
        </nav>
      </header>
    );
  }

  if (user.userType === "shelter") {
    return (
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex">
            <Link to="/">
              <a className="-m-1.5 p-1.5">
                <span className="sr-only">Barkly</span>
                <img className="h-8 w-auto" src="src/assets/fullLogo.svg" alt="" />
              </a>
            </Link>
          </div>

        {/*    UPDATE     */}
        {isLoggedIn && (
          <>
          <div className="flex  gap-x-12">


<Link to="/shelter/profile"> <button className="text-sm font-semibold leading-6 text-gray-900">
  Our Listings
  </button>
</Link>

<Link to="/shelter/listing"><button className="text-sm font-semibold leading-6 text-gray-900">
  Add Listing</button>
</Link>


</div>

<div className="flex items-center">
<HomeIcon className="h-5 w-5 text-gray-600 mx-4"  />
<button className="text-sm font-semibold leading-6 text-gray-900" onClick={logOutUser}>Logout</button>
</div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
            <Link to="/shelter">
              {" "}
              <button>Shelter</button>{" "}
            </Link>
          </>
        )}
      </nav>
      </header>
    );
  } else {
    return (
         <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex">
            <Link to="/">
              <a className="-m-1.5 p-1.5">
                <span className="sr-only">Barkly</span>
                <img className="h-8 w-auto" src="/src/assets/fullLogo.svg" alt="" />
              </a>
            </Link>
          </div>

        {isLoggedIn && (
          <>
            <Link to="/user/favorites" className="text-sm font-semibold leading-6 text-gray-900">
              <button>Favorites</button>
            </Link>


            <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-600 mx-4"  />
<button className="text-sm font-semibold leading-6 text-gray-900" onClick={logOutUser}>Logout</button>
</div>

          </>
        )}

      </nav>
      </header>
    );

  }
}

export default Navbar;
