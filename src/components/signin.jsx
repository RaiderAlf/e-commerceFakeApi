//DEPENDENCIES
import axios from "axios";
//HOOKS
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
//ACTIONS
import { addUser, removeUser } from "../redux/actions";
//COMPONENTS
import NavBarLogin from "./navbarLogin"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


const Signin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [alertOpen, setAlertOpen] = useState(false)

    function closeAlert() {
        setAlertOpen(false)
    }

    function openAlert() {
        setAlertOpen(true)
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(removeUser())

        axiosInstance.post('/signin', inputForm)
            .then(data => {
                if (data.data) {

                    dispatch(addUser(data.data))
                    navigate('/')

                }
            })
            .catch(error => {
                setErrState({
                    message: error.response.data.message
                })
                openAlert()
            })

    };

    const [errState, setErrState] = useState({
        message: ""
    })

    const [inputForm, setInputForm] = useState({
        email: "",
        pass: "",
    })

    const handlerForm = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>

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
                                    <button
                                        type="button"
                                        className="flex flex-col items-center justify-center gap-1 text-slate-800 hover:text-black-500"
                                        onClick={closeAlert}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                        <svg className="flex-shrink-0 inline w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                    </button>
                                    <div className='flex items-center justify-center'>
                                        <span className="sr-only text-red">Info</span>
                                        <div className='flex flex-col items-center justify-center gap-1'>
                                            <span className="font-medium text-red-700">Error</span>
                                            <span className="font-bold text-red-900">{errState.message}</span>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <NavBarLogin />
            <form className="max-w-sm mx-auto my-40">
                <h1 className="text-slate-500 text-center text-lg font-medium my-8 [text-shadow:_0_5px_5px_rgb(0_0_0_/_50%)]">
                    Sign In
                </h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" onChange={e => handlerForm(e)} value={inputForm.email} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" onChange={e => handlerForm(e)} value={inputForm.pass} name="pass" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <label htmlFor="pass" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                {/* <div className="flex items-start mb-5 my-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-slate-100 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-slate-400">Remember me</label>
                </div> */}
                {
                    inputForm.email !== "" && inputForm.password !== "" ? (
                        <button onClick={handleSubmit} type="submit" className="my-4 text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    ) : (
                        <button type="submit" disabled className="my-4 disabled text-slate-300 bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    )
                }

            </form>
        </>
    )
}

export default Signin