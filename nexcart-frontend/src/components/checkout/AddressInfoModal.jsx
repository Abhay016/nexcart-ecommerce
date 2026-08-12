import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react';
import React, { Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-700 bg-opacity-60" />
        </Transition.Child>

        {/* Centered container */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <DialogPanel className="relative w-full max-w-lg mx-auto transform overflow-hidden bg-white rounded-xl shadow-2xl transition-all">
              {/* Header */}
              <div className="flex justify-between items-center border-b px-6 py-4">
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Address Information
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="p-2 rounded-full text-slate-600 hover:bg-gray-100 transition"
                >
                  <FaTimes size={20} />
                </button>

              </div>

              {/* Content */}
              <div className="px-6 py-6">{children}</div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddressInfoModal;
