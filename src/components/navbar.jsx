//DEPENDENCIES
import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
//HOOKS
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { getCategoryProduct, getProducts, removeCartProducts, removeUser } from '../redux/actions'
//ASSETS
import LOGO from '../assets/LOGO.jpg'


const navigation = {
    categories: [
    ],
    pages: [
        { name: "All Products", href: "#" },
        { name: "Men's Clothing", href: '#' },
        { name: "Women's Clothing", href: '#' },
        { name: 'Jewelery', href: '#' },
        { name: 'Electronics', href: '#' }
    ],
}



const NavBar = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.cartProducts)

    let user = useSelector(state => state.user)

    let result = 0;

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            result = Math.round(products[i].price + result)
        }
    }

    const handlerCloseSession = () => {
        dispatch(removeUser())
    }

    const removeAllItems = () => {
        dispatch(removeCartProducts())
    }


    const handleFilter = (page) => {
        dispatch(getCategoryProduct(page));
    };

    const handleAllProducts = () => {
        dispatch(getProducts())
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

    const [open, setOpen] = useState(false)


    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


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
                                    {navigation.pages.map((page) => (

                                        <div key={page.name} className="flow-root">
                                            <a onClick={page.name == "All Products" ?
                                                () => handleAllProducts() :
                                                () => handleFilter(page.name.toLowerCase())
                                            }
                                                className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                {
                                    user.firstname ? "" : (
                                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                            <div className="flow-root">
                                                <Link to='/signin' href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Sign in
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link to="/create" href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Create account
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }



                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="fixed top-0 w-full bg-slate-100">

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
                                <div >
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-12 rounded w-auto"
                                        src={LOGO}
                                        alt="YOUR"
                                    />
                                </div>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.pages.map((page) => (
                                        <a
                                            onClick={
                                                page.name == "All Products" ?
                                                    () => handleAllProducts() :
                                                    () => handleFilter(page.name.toLowerCase())
                                            }
                                            key={page.name}
                                            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer hover:underline "
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                {
                                    user.firstname ? "" : (
                                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <Link to='/signin' href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                                Sign in
                                            </Link>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <Link to="/create" href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                                Create account
                                            </Link>
                                        </div>
                                    )
                                }

                                {
                                    user.firstname && (
                                        <div className='flex justify-center items-center' >
                                            <div className="ml-4 flow-root lg:ml-6">
                                                <a href="#" onClick={openModal} className="group -m-2 flex items-center p-2">
                                                    <ShoppingBagIcon
                                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        aria-hidden="true"

                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{products.length}</span>
                                                    <span className="sr-only">items in cart, view bag</span>
                                                </a>
                                            </div>

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

                                                                            <div id="dropdownDivider" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                                                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDividerButton">
                                                                                    <li>
                                                                                        <a href="#" onClick={openModal} className="block px-4 py-2 hover:bg-gray-100">ShopCart</a>
                                                                                    </li>
                                                                                    {/* <li>
                                                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                                                                    </li> */}
                                                                                </ul>
                                                                                <div className="py-2">
                                                                                    <a href="#" onClick={openAlert} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
                                                                                </div>
                                                                            </div>

                                                                        </Dialog.Panel>
                                                                    </Transition.Child>
                                                                </div>
                                                            </div>
                                                        </Dialog>
                                                    </Transition>

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
                                                                        <Dialog.Panel onClick={closeAlert} className="w-fit flex flex-col bg-slate-200 items-center justify-center max-w-md text-blue-900 transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all" role="alert">
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


                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
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
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={closeModal}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" onClick={closeModal} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root grid place-content-center">
                                                        {products.length > 0 ?
                                                            <ul role="list" className="-my-6 divide-y divide-gray-100">
                                                                <button className="font-medium text-xs text-indigo-500 hover:text-indigo-500" onClick={() => removeAllItems()} >Delete Cart</button>
                                                                <hr />
                                                                {
                                                                    products.map((product) => (
                                                                        <li key={product.id} className="flex py-6">
                                                                            <div className="h-24 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <img
                                                                                    src={product.image}
                                                                                    alt={product.title}
                                                                                    className="h-fit w-fit"
                                                                                />
                                                                            </div>

                                                                            <div className="ml-4 flex gap-3 flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex flex-col gap-1 justify-between text-gray-900">
                                                                                        <h3 className='font-bold'>
                                                                                            <a href={product.href}>{product.title}</a>
                                                                                        </h3>
                                                                                        <p className="self-end font-medium">$ {product.price}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">

                                                                                    <div className="flex">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="font-medium text-indigo-500 hover:text-indigo-500"
                                                                                        >
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>))
                                                                }
                                                            </ul>
                                                            : (
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-center text-xl font-medium text-gray-500">Cart Empty</p>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>$ {result}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={closeModal}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div >
    )
}

export default NavBar