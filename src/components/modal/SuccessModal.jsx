import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useError } from "../../contexts/ErrorContext";
import { useMovie } from "../../contexts/MovieContext";

export default function SuccessModal({ message }) {
    let [isOpen, setIsOpen] = useState(true);
    const ctxError = useError();

    function closeModal() {
        ctxError.setError(null);
        setIsOpen(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className=" max-w-md transform overflow-hidden rounded-2xl bg-[#2c2c4ece] p-6 align-middle shadow-xl transition-all text-center">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[20px]  text-white font-bold"
                                    >
                                        {message}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-md font-semibold text-[#FF2786]">
                                            {/* {`username or password is incorrect.`} */}
                                            {message}
                                        </p>
                                    </div>

                                    {/* <div className="mt-4 space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#ebebf48e] px-4 py-2 text-sm font-semibold text-[#3F3F6F] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            OKAY I UNDERSTAND
                                        </button>
                                    </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
