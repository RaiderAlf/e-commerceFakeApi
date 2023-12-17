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

    const [loader, setLoader] = useState(false)

    function closeAlert() {
        setAlertOpen(false)
    }

    function openAlert() {
        setAlertOpen(true)
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        setLoader(true)

        dispatch(removeUser())

        axiosInstance.post('/signin', inputForm)
            .then(data => {
                if (data.data) {

                    setLoader(false)
                    dispatch(addUser(data.data))
                    navigate('/')
                }
            })
            .catch(error => {
                setLoader(false)
                setErrState({
                    message: error.response.data.message
                })
                openAlert()
                setInputForm({
                    email: "",
                    pass: "",
                })
            })

    };

    const [seePass, setSeePass] = useState(false)

    const handlerSeePass = () => {
        if (seePass === false) {
            setSeePass(true)
            return;
        }
        setSeePass(false)
    }


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

            <Transition appear show={loader} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black/70" />
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
                                <Dialog.Panel className="w-fit flex flex-col items-center justify-center max-w-md text-blue-900 transform overflow-hidden rounded-2xl bg-gray-400 p-6 text-left align-middle shadow-xl transition-all" role="alert">
                                    <button
                                        type="button"
                                        className="flex flex-col items-center justify-center gap-1 text-slate-800 hover:text-black-500"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                    </button>
                                    <div className='flex items-center justify-center'>
                                        <span className="sr-only text-red">Info</span>
                                        <div className='flex flex-col items-center justify-center gap-1'>
                                            <span className="font-medium text-blue-800">Please Wait</span>
                                            <div className="loader1"></div>
                                            <span className="font-bold text-blue-900">Loading User</span>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <NavBarLogin />
            <form className="max-w-sm mx-auto my-44 [box-shadow:_0_0_5px_rgb(0_0_0_/_60%)] backdrop-blur-xl bg-white/90 rounded px-8 py-2">
                <h1 className="text-slate-700 text-lg border text-center font-medium my-8 backdrop-blur-3xl rounded-lg [box-shadow:_0_0_5px_rgb(0_0_0_/_50%)]">
                    Sign In
                </h1>
                <div className="relative z-0 w-full mb-8 group">
                    <input type="email" onChange={e => handlerForm(e)} value={inputForm.email} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-8 group">


                    <input type={seePass ? "text" : "password"} onChange={e => handlerForm(e)} value={inputForm.pass} name="pass" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {
                            seePass ? (
                                <svg onClick={handlerSeePass} className="h-6 text-slate-500" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512">
                                    <path fill="currentColor"
                                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                    </path>
                                </svg>
                            ) : (
                                <svg onClick={handlerSeePass} className="h-6 text-slate-400" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">
                                    <path fill="currentColor"
                                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                    </path>
                                </svg>
                            )
                        }
                    </div>
                    <label htmlFor="pass" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                {/* <div className="flex items-start mb-5 my-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-slate-100 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-slate-400">Remember me</label>
                </div> */}
                {
                    inputForm.email !== "" && inputForm.password !== "" ? (
                        <button onClick={handleSubmit} type="submit" className="text-white bg-slate-700 hover:[box-shadow:inset_0_0_5px_rgb(255_255_255_/_50%)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center">Submit</button>
                    ) : (
                        <button type="submit" disabled className="disabled text-slate-300 bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center">Submit</button>
                    )
                }

            </form>
        </>
    )
}

export default Signin