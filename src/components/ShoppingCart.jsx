//HOOKS
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS
import { removeProduct, removeCartProducts } from '../redux/actions'
//COMPONENTS
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CheckOut from './CheckOutPayPal';



const ShoppingCart = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.cartProducts)
    let user = useSelector(state => state.user)


    const removeAllItems = () => {
        dispatch(removeCartProducts())
    }

    const removeOneProduct = (id) => {
        dispatch(removeProduct(id))
    }

    function closeModal() {
        setCheckOpen(false)
    }

    let [checkOpen, setCheckOpen] = useState(false);

    function OpenCheck() {
        setCheckOpen(true)
    }

    function closeCheck() {
        setCheckOpen(false)
    }



    let result = 0;

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            result += products[i].price
            result.toFixed(2)
        }
    }

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart</Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeModal}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root place-content-center">
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
                                                            onClick={() => removeOneProduct(product.id)}
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
                <div className="mt-6 flex flex-col">

                    {
                        products.length !== 0 ? (
                            <button
                                onClick={OpenCheck}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </button>
                        ) : (
                            <button disabled
                                onClick={OpenCheck}
                                className="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </button>
                        )
                    }



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
            <Transition.Root appear show={checkOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeCheck}>
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

                    <div className="fixed inset-0 overflow-hidden w-screen">
                        <div className="absolute inset-0 overflow-hidden w-screen">
                            <div className="pointer-events-none fixed inset-y-0 right-0 min-w-screen flex pb-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-y-full"
                                    enterTo="translate-y-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-y-0"
                                    leaveTo="translate-y-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen min-h-screen min-w-max overflow-auto">

                                        <div className="p-4 min-w-max min-h-screen bg-white bg-opacity-85 transition">
                                            <button className="flex items-center justify-between w-full px-5" >
                                                <Dialog.Title className="text-lg font-medium text-gray-900">CheckOut</Dialog.Title>
                                                <XMarkIcon onClick={closeCheck} className="relative text-black h-12 w-12" />
                                            </button>
                                            <div className="flex flex-col items-center text-center mt-12 gap-3 justify-between w-full text-base font-medium text-gray-900">
                                                <h3 className='text-2xl text-slate-400'>CheckOut Information</h3>
                                                <div className="flex flex-col gap-2 items-center justify-center text-base font-medium text-gray-900">
                                                    <div>
                                                        {user.firstname} {user.lastname}
                                                    </div>
                                                    <span>{user.email}</span>
                                                </div>

                                                <div className="flex gap-2 justify-between  font-medium text-gray-900">
                                                    <span>Total Products</span>
                                                    <p> {products.length} {products.length > 1 ? "items" : "item"}</p>
                                                </div>

                                                <div className="flex gap-2 justify-between text-base font-medium text-gray-900">
                                                    <p>Total Price</p>
                                                    <p>$ {Math.ceil(result) + 4.99}</p>
                                                </div>
                                            </div>
                                            <div className='mx-80 mt-12'>

                                                <CheckOut />
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>

    )
}

export default ShoppingCart