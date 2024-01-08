//HOOKS
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { getCategoryProduct, filterByName, getProducts } from '../redux/actions'
//COMPONENTS
import { Link } from 'react-router-dom'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import UserAvatar from './UserAvatar';
//ASSETS
import LOGO from '../assets/LOGO.jpg'
import ShoppingCart from './ShoppingCart'


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
    const allProducts = useSelector(state => state.product)

    let user = useSelector(state => state.user)

    let result = 0;

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            result = Math.round(products[i].price + result)
        }
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

    const handleSearch = event => {
        if (event.target.value) {
            const searchText = event.target.value;
            const matchedProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchText.toLowerCase())
            );

            dispatch(filterByName(matchedProducts));

            console.log(matchedProducts, searchText)
        }
    };



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
                            <Dialog.Panel onClick={() => setOpen(false)} className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex justify-between px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    <div className="lg:flex lg:ml-0" aria-hidden="true">
                                        <Link to='/' >
                                            <span className="sr-only">Mobile Shop</span>
                                            <img
                                                className="h-12 rounded w-auto"
                                                src={LOGO}
                                                alt="YOUR"
                                            />
                                        </Link>
                                    </div>
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

            <header className="fixed top-0 w-full bg-slate-100 [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)]">

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md mr-5 bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="hidden ml-4 lg:flex lg:ml-0">
                                <Link to='/' >
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-12 rounded w-auto"
                                        src={LOGO}
                                        alt="YOUR"
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.pages.map((page) => (
                                        <Link to='/'
                                            onClick={
                                                page.name == "All Products" ?
                                                    () => handleAllProducts() :
                                                    () => handleFilter(page.name.toLowerCase())
                                            }
                                            key={page.name}
                                            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer hover:underline "
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>


                            <form className='md:w-80 lg:block lg:ml-12 lg:w-96'>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-slate-400" onChange={handleSearch} placeholder="Search Products . . ." />
                                    <button type="submit" onClick={() => handleAllProducts()} className="text-white absolute end-2 bottom-1.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5">X</button>
                                </div>
                            </form>



                            <div className="ml-auto flex items-center">
                                {
                                    user.firstname ? (
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

                                            <UserAvatar user={user} />
                                        </div>
                                    ) : (
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


                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* SHOPPING CART */}

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
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />

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
        </div >
    )
}

export default NavBar