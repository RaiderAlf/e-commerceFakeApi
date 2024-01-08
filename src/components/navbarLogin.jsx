//HOOKS
import { Fragment, useState } from 'react'
//COMPONENTS
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
//ASSETS
import LOGO from '../assets/LOGO.jpg'


const NavBarLogin = () => {

    const [open, setOpen] = useState(false)


    return (
        <div className="bg-slate-100">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}


                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <Link to='/' className="-m-2 block p-2 font-medium text-gray-900">
                                            Enter Guess
                                        </Link>
                                    </div>
                                    < hr />
                                    <div className="flow-root">
                                        <Link to='/signin' className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to='/create' className="-m-2 block p-2 font-medium text-gray-900">
                                            Create Account
                                        </Link>
                                    </div>
                                    < hr />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="fixed top-0 w-full bg-slate-100/90 [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)]">

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <div className='flex items-center justify-center gap-4' >
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-12 rounded w-auto"
                                        src={LOGO}
                                        alt="YOUR"
                                    />
                                    <span className='text-slate-400 text-lg font-medium'>Mobile Shop</span>
                                </div>
                            </div>

                            {/* Flyout menus */}

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <span className="h-6 w-px bg-gray-400" aria-hidden="true" />
                                    <Link to='/signin' className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <Link to='/create' className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div >
    )
}

export default NavBarLogin