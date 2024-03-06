import { useState } from 'react'

import ShareModal from './ShareModal'

const ShareActions = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <ShareModal show={showModal} setShow={setShowModal} />

      <div className="flex flex-col justify-center space-y-2 pt-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        <button
          type="button"
          className="button"
          onClick={() => setShowModal(true)}
        >
          Share
        </button>
      </div>
    </>
  )
}

export default ShareActions
