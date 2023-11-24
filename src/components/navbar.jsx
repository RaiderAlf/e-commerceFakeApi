//DEPENDENCIES
import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
//HOOKS
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { getCategoryProduct, getProducts, removeCartProducts } from '../redux/actions'
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

    console.log(products)


    let result = 0;

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            result = Math.round(products[i].price + result)
        }
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

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <a href="#" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
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
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link to='/signin' href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <Link to="/create" href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                        Create account
                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex ">
                                    <a href="#" className="flex items-center text-slate-500 hover:text-slate-900">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>

                                {/* Cart */}
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