'use client'

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { forwardRef, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { flushSync } from 'react-dom'

import { navigate, routes } from '@redwoodjs/router'

const MAX_ROTATE = 2

const Frame = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex min-h-56 w-full items-center justify-center rounded-lg bg-gradient-to-t from-white to-neutral-200 p-4 shadow shadow-black ring-2 ring-inset ring-neutral-600 group-hover:shadow-lg group-hover:shadow-black"
    >
      {props.children}
    </div>
  )
})

const Slide = ({ photo }) => {
  const [show, setShow] = useState(false)

  const randomRotate =
    Math.round((Math.random() * (MAX_ROTATE * 2) - MAX_ROTATE) * 10) / 10

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, (photo.id * 1000) / 50)
  }, [photo])

  const onClick = (photo) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(routes.edit({ id: photo.id }))
        })
      })
    } else {
      navigate(routes.edit({ id: photo.id }))
    }
  }

  return (
    <li
      className={clsx(
        `rotate-[${randomRotate}deg]`,
        'group flex w-1/2 cursor-pointer justify-center p-3 transition duration-150 ease-in-out hover:scale-110 md:w-1/3 lg:w-1/4 xl:w-1/5'
      )}
      onClick={() => onClick(photo)}
    >
      <Transition
        className="ease transform"
        enter="transition duration-300"
        enterFrom="opacity-0 scale-110"
        enterTo="opacity-100 scale-100"
        as={Frame}
        show={show}
      >
        <img
          src={`/photos/${photo.filename}`}
          alt={`id ${photo.id}`}
          className="rounded-sm object-cover shadow-inner ring-2 ring-neutral-200 md:max-h-50"
        />
      </Transition>
    </li>
  )
}

export default Slide
