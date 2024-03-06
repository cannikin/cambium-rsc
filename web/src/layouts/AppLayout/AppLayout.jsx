/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { flushSync } from 'react-dom'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AppLayout = ({ children }) => {
  const onClick = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(routes.home())
        })
      })
    } else {
      navigate(routes.home())
    }
  }

  return (
    <>
      <Metadata title="Cambium" description="RedwoodJS Photo Editor" />

      <div className="mx-auto max-w-screen-lg pb-16 xl:max-w-screen-xl">
        <header className="px-4 pb-4 pt-6">
          <h1 className="flex items-start">
            <div onClick={onClick} className="group flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-500 transition duration-150 group-hover:bg-white">
                <div className="h-4 w-6 bg-neutral-800">&nbsp;</div>
              </div>
              <button
                type="button"
                onClick={onClick}
                className="ml-2 text-3xl  font-semibold text-neutral-500 transition duration-150 group-hover:text-white"
              >
                cambium
              </button>
            </div>
          </h1>
        </header>
        <main className="">{children}</main>
      </div>
    </>
  )
}

export default AppLayout
