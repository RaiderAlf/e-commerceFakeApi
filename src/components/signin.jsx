//HOOKS
import { useState } from 'react'
//COMPONENTS
import NavBarLogin from "./navbarLogin"

const Signin = () => {

    const [inputForm, setInputForm] = useState({
        email: "",
        password: "",
    })

    const handlerForm = (e) => {
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
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
                    <input type="password" onChange={e => handlerForm(e)} value={inputForm.password} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="flex items-start mb-5 my-4">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-slate-100 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-slate-400">Remember me</label>
                </div>
                {
                    inputForm.email !== "" && inputForm.password !== "" ? (
                        <button type="submit" className="my-4 text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    ) : (
                        <button type="submit" disabled className="my-4 disabled text-slate-300 bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    )
                }

            </form>
        </>
    )
}

export default Signin