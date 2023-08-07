import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const API_URL = "https://clear-bee-dress.cyclic.app";


const faqs = [
    {
      question: "Why should I adopt a shelter dog?",
      answer:
        "Shelter dogs are often diverse in age, breeds, and personalities, making it likely that you'll find a perfect match for your home. Adopting a shelter dog not only saves a life but also undermines the demand for puppy mills that often operate in inhumane conditions.",
    },
    {
      question: "How can I prepare my home for a shelter dog?",
      answer:
        "Make sure your home is safe, with no hazardous substances or small items that a dog could swallow. Prepare a space for the dog to eat and sleep. You'll also need food, bowls, a collar, a leash, and toys. Remember, the transition may be stressful, so patience and consistency are key.",
    },
    {
      question: "What should I know about the adoption process?",
      answer:
        "The process can vary by shelter but generally includes an application, interview, and sometimes a home visit. You may need to provide references and proof of your ability to care for a pet. There's often an adoption fee, which covers vaccinations, microchipping, and spaying/neutering.",
    },
    {
      question: "Are shelter dogs healthy?",
      answer:
        "Shelters usually conduct health checks before putting dogs up for adoption. They'll have necessary vaccinations and often will be spayed or neutered. However, they might have health issues from their previous lives, which the shelter should disclose during the adoption process.",
    },
    {
      question: "How can I help my shelter dog adjust to a new home?",
      answer:
        "Be patient and provide a quiet and comfortable space for your new pet. Maintain a consistent daily routine for feeding, walks, and playtime. It's essential to offer lots of love while your pet acclimates to its new surroundings.",
    },
    {
      question: "Can shelter dogs be trained?",
      answer:
        "Absolutely. While some may have behavioral issues due to past trauma, with time, patience, and consistent training, shelter dogs can learn commands and household rules. Consider professional training classes if necessary.",
    },
    {
      question: "What should I feed my shelter dog?",
      answer:
        "It's recommended to continue feeding your newly adopted dog the same food that they had at the shelter, then gradually transition to new food if needed. Ensure the food is appropriate for the dog's age, size, and health status. Always have fresh water available.",
    },
    {
      question: "How often should I take my shelter dog to the vet?",
      answer:
        "You should schedule a vet visit soon after adoption to assess your dog's health and get any necessary vaccinations. Afterward, regular annual check-ups are typical, but puppies and senior dogs might require more frequent visits.",
    },
  ]


export default function LearningCenter() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
