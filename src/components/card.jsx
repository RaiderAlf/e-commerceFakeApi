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
                                <Dialog.Panel className="w-full flex flex-col justify-center items-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2' onClick={closeModal} >X</button>
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
                                        <p className="mt-1 text-center font-medium text-gray-900">Price: {product.price} $</p>
                                        <p className="mt-1 text-center text-sm text-gray-900">{product.description} $</p>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p className="ms-2 text-sm font-bold text-gray-900">{product.rating.rate}</p>
                                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                            <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline">{product.rating.count} reviews</a>
                                        </div>

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