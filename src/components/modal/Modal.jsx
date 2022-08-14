import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useMovie } from "../../contexts/MovieContext";

export default function Modal({ handle, className, buttonName, disabled }) {
    let [isOpen, setIsOpen] = useState(false);
    const ctx = useMovie();

    function closeModal() {
        setIsOpen(false);
    }
    function deleteModal() {
        handle();
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <button onClick={openModal} className={className}>
                {buttonName}
            </button>

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#3F3F6F] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[20px]  text-white font-bold"
                                    >
                                        {`Are your sure to ${buttonName} this Content?`}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-white">
                                            {` Please make sure you want to ${buttonName}
                                            this content.`}
                                        </p>
                                    </div>

                                    <div className="mt-4 space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#AAAACF] px-4 py-2 text-sm font-semibold text-[#EBEBF4] hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={deleteModal}
                                        >
                                            Yes! of Course
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#FF2786] font-semibold px-4 py-2 text-sm text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            I'm not sure
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
