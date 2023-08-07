import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const API_URL = "https://clear-bee-dress.cyclic.app";

const stats = [
  {
    label: "Pets Entering Shelters Annually in the U.S.",
    value: "6.5 million",
  },
  {
    label: "Pets Adopted from Shelters Annually in the U.S.",
    value: "3.2 million",
  },
  { label: "Puppy Mills Currently Active in the U.S.", value: "Over 10,000" },
];

const values = [
  {
    name: "Advocate for Shelter Dogs",
    description:
      "At Barkly, we stand for the countless dogs in shelters awaiting adoption. We believe every dog deserves a loving home and we commit to making this belief a reality.",
  },
  {
    name: "Innovate Adoption",
    description:
      "We are transforming the landscape of dog adoption. Barkly strives to simplify and streamline the process, making it easy for potential adopters to find their new best friends.",
  },
  {
    name: "Replace Puppy Mills",
    description:
      "By promoting shelter adoptions, Barkly aims to replace the demand that fuels the puppy mill industry. We are committed to creating a humane alternative for prospective pet owners.",
  },
  {
    name: "Raise Awareness",
    description:
      "Barkly believes in the power of knowledge. We aim to raise awareness about the issues surrounding shelter dogs and puppy mills, sparking a change in perceptions and actions.",
  },
  {
    name: "Empower Community",
    description:
      "We encourage the community to join our mission. Through fostering a sense of responsibility and compassion, we can collectively ensure every dog finds a loving home.",
  },
  {
    name: "Celebrate Success",
    description:
      "Every adoption is a cause for celebration at Barkly. We revel in the joy each adoption brings, fueling our dedication to creating more such happy endings.",
  },
];

export default function MissionPage() {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ffffff] to-[#ffffff] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Giving shelter dogs a new leash on life.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    At Barkly, we're innovating the dog adoption process. Too
                    often, potential adopters navigate a complex journey to
                    bring a dog home. Barkly is the change, simplifying this
                    path. We're not just a platform - we're the bridge
                    connecting dogs and potential homes. By streamlining
                    adoption, we make it transparent and straightforward. Barkly
                    stands for second chances. We focus on giving shelter dogs
                    the opportunity to find a loving home, thus undermining
                    puppy mills. Join Barkly. Let's transform dog adoption and
                    ensure every dog finds a loving home. Together, we can
                    create a future where every tail wags with joy.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1527362950785-f487a7c1fe48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3084&q=80"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1528301725143-1ba694832e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2432&q=80"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1620148639493-5a7cc139813d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1601758260944-72f34e1b8d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1541687786053-e441da2fa7f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  At Barkly, our goal is to shed light on the predicament of
                  shelter dogs and the ongoing issue of puppy mills. Annually,
                  almost 6.5 million dogs and cats find themselves in shelters,
                  with only about 3.2 million finding their forever homes.
                  Unfortunately, an excess number remain unadopted. Meanwhile,
                  an estimated 10,000 puppy mills operate, often under harsh
                  conditions.
                </p>
                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p>
                    Facilitating the connection between prospective pet owners
                    and adoptable shelter dogs is our primary focus. We aim to
                    alleviate the number of unadopted dogs and offer a humane
                    alternative to the puppy mill industry.
                  </p>
                  <p className="mt-10">
                    Promoting adoption, we provide these dogs with a second
                    chance at life and combat the demand driving puppy mills.
                    Through our endeavors, we aim to create awareness, inspire
                    change, and make a substantial difference in our furry
                    friends' lives, one adoption at a time.
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {stat.label}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            src="https://plus.unsplash.com/premium_photo-1663051069851-57457929f67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3010&q=80"
            alt=""
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Barkly's principles are the backbone of our mission. We believe in
              compassion, innovation, and commitment to our goal - every shelter
              dog deserves a loving home.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative my-32">
          <br></br>
        </div>
      </main>
    </div>
  );
}
