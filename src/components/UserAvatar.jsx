//DEPENDENCIES
import Cookies from 'js-cookie';
//HOOKS
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { removeUser } from '../redux/actions'
//COMPONENTS
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ShoppingCart from './ShoppingCart'


const UserAvatar = () => {

    let user = useSelector(state => state.user)

    const dispatch = useDispatch()


    const handlerCloseSession = () => {
        dispatch(removeUser())
        Cookies.remove('user');
    }

    let [alertOpen, setAlertOpen] = useState(false)


    function closeAlert() {
        setAlertOpen(false)
    }

    function openAlert() {
        setAlertOpen(true)
    }


    let [openDrop, setOpenDrop] = useState(false)

    function closeDropdown() {
        setOpenDrop(false)
    }

    function openDropdown() {
        setOpenDrop(true)
    }

    let [isOpen, setIsOpen] = useState(false)


    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <div className="ml-4 flow-root lg:ml-6">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {
                    user.firstname && user.avatar ? (
                        <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            <img onClick={openDropdown} src={user.avatar} className="w-10 h-10 rounded-full [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)]" alt={user.email} />
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    ) : (
                        <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm inline-flex items-center" type="button">
                            <svg onClick={openDropdown} className="py-2 [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)] absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    )
                }
                <Transition appear show={openDrop} as={Fragment}>
                    <Dialog as="div" className="" onClose={closeDropdown}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>

                        <div className="fixed top-4 right-5">
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
                                    <Dialog.Panel onClick={closeDropdown} className="w-fit flex flex-col items-center justify-center transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all" role="alert">

                                        <div id="dropdownDivider" className="z-10 bg-white divide-y divide-gray-200 rounded-lg shadow w-44">
                                            <span className='bg-slate-200 rounded-t-xl block px-10 py-2 text-sm text-gray-500' aria-labelledby="dropdownDividerButton">{user.firstname} {user.lastname}</span>
                                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDividerButton">
                                                <li>
                                                    <a href="#" onClick={openModal} className="block px-4 py-2 hover:bg-gray-300">Shop Cart</a>
                                                </li>
                                                <li>
                                                    <Link to='/settings' className="block px-4 py-2 hover:bg-gray-300">Settings</Link >
                                                </li>
                                            </ul>
                                            <div className="py-2">
                                                <a href="#" onClick={openAlert} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">Sign Out</a>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* CONFIRM SIGN OUT */}

                <Transition appear show={alertOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0" onClose={closeAlert}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/50" />
                        </Transition.Child>

                        <div className="fixed inset-0 ">
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
                                    <Dialog.Panel onClick={closeAlert} className="w-fit flex flex-col items-center justify-center max-w-md text-blue-900 transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all" role="alert">
                                        <div className='flex flex-col gap-8 items-center justify-center '>
                                            <h2 className='font-semibold ' >Are you Sure?</h2>
                                            <div className='flex gap-8 items-center justify-center' >

                                                <button
                                                    type="button"
                                                    className="relative flex flex-col font-semibold bg-slate-400 items-center border-2 rounded-md justify-center gap-1 -m-2 p-2 text-red-800 ease-in-out duration-300 hover:bg-slate-600 hover:text-red-600"
                                                    onClick={handlerCloseSession}
                                                >
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    Sign Out
                                                </button>
                                                <button
                                                    type="button"
                                                    className="relative flex flex-col font-semibold bg-slate-300 items-center border-2 rounded-md justify-center gap-1 -m-2 p-2 text-blue-800 ease-in-out duration-300 hover:bg-slate-400 hover:text-blue-600"
                                                    onClick={closeAlert}
                                                >
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition.Root appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                            <button className="fixed right-12  transition-opacity" >
                                                <XMarkIcon onClick={closeModal} className="relative inset-4 h-12 w-12" />
                                            </button>
                                            <ShoppingCart />
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

            </div>
        </div>
    )
}

export default UserAvatar