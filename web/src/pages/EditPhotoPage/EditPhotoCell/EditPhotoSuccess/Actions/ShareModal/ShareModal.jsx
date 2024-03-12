import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

const ShareModal = ({ show, setShow }) => {
  const [copied, setCopied] = useState(false)
  const link = location.href.replace('/edit', '')

  const onCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
  }

  const onClose = () => {
    setShow(false)
    setCopied(false)
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl shadow-black/20 transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-neutral-400"
                >
                  Share URL
                  {copied && ' - Copied'}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="flex items-center space-x-2 text-sm text-neutral-500">
                    <input
                      type="text"
                      className="w-full cursor-pointer rounded border border-neutral-500 bg-neutral-700 px-2 py-2 text-neutral-400 outline-none hover:border-neutral-400"
                      defaultValue={link}
                      readOnly
                      title="Click to copy"
                      onClick={onCopy}
                    />
                    <button
                      type="button"
                      title="Click to copy"
                      onClick={onCopy}
                    >
                      <ClipboardDocumentIcon className="h-8 w-8 text-neutral-500 hover:text-neutral-400" />
                    </button>
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-400 px-4 py-2 text-sm font-semibold text-neutral-900 transition duration-150 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ShareModal
