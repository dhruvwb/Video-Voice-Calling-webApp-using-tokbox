import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function ErrorDialog({ msg }) {
  // The open/closed state lives outside of the Dialog and is managed by you
  const [isOpen, setIsOpen] = useState(true)

  return (
    /*
      Pass `isOpen` to the `open` prop, and use `onClose` to set
      the state back to `false` when the user clicks outside of
      the dialog or presses the escape key.
    */
    <Dialog
      className="fixed top-3 z-10 flex flex-col items-center w-screen overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="p-4 text-neutral-200 bg-neutral-900 shadow-2xl rounded-md">
        <Dialog.Title>{msg}</Dialog.Title>
        <button
          className="float-right mt-1 mr-3"
          onClick={() => setIsOpen(false)}
        >
          OK
        </button>
      </div>
    </Dialog>
  )
}
