//DEPENDENCIES
import { Dialog, Transition } from '@headlessui/react'
//HOOKS
import { Fragment, useState } from "react"

const Card = (product) => {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
                        <div className="fixed inset-0 bg-black/25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        {product.title}
                                    </Dialog.Title>
                                    <div className="mt-2" onClick={closeModal}>
                                        <div className="flex flex-col justify-center items-center aspect-h-1 h-80 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={product.image}
                                                alt={product.description}
                                                className="h-80"
                                            />
                                        </div>
                                        <p className="mt-1 text-center font-medium text-gray-900">{product.price} $</p>
                                        <p className="mt-1 text-center text-sm text-gray-900">{product.description} $</p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div key={product.id} className="group p-2 flex rounded border border-gray-100 flex-col justify-center items-center">
                <h3 className="mt-4 text-center text-sm font-medium text-gray-700">{product.title}</h3>
                <div className="flex flex-col justify-center items-center aspect-h-1 h-56 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7" onClick={openModal}>
                    <img
                        src={product.image}
                        alt={product.description}
                        className="w-36"
                    />
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
            </div>
        </>
    )
}

export default Card