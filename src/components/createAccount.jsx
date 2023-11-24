//DEPENDENCIES
import axios from "axios";
//HOOKS
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
//COMPONENTS
import NavBarLogin from "./navbarLogin"
import { addUser, removeUser } from "../redux/actions";

const CreateAccount = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        console.log(inputForm, file)

        e.preventDefault();

        dispatch(removeUser())

        axios.post('http://localhost:3001/register', inputForm)
            .then(data => dispatch(addUser(data.data)), navigate('/'))
            .catch(error => console.error("ERROR!", error))

    };

    const [seePass, setSeePass] = useState(false)

    const handlerSeePass = () => {
        if (seePass === false) {
            setSeePass(true)
            return;
        }
        setSeePass(false)
    }

    const [file, setFile] = useState();

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const delFile = () => {
        setFile()
    }

    const [inputForm, setInputForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        avatar: file
    })

    const handlerForm = (e) => {
        console.log(file)
        setInputForm({
            ...inputForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <NavBarLogin />

            <form className="max-w-sm mx-auto my-28">
                <h1 className="text-slate-500 text-lg text-center font-medium my-8 [text-shadow:_0_5px_5px_rgb(0_0_0_/_50%)]">
                    Create Account
                </h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" onChange={e => handlerForm(e)} value={inputForm.email} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type={seePass ? "text" : "password"} onChange={e => handlerForm(e)} value={inputForm.password} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

                        {
                            seePass ? (
                                <svg onClick={handlerSeePass} className="h-6 text-slate-300" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512">
                                    <path fill="currentColor"
                                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                    </path>
                                </svg>
                            ) : (
                                <svg onClick={handlerSeePass} className="h-6 text-slate-200" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">
                                    <path fill="currentColor"
                                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                    </path>
                                </svg>
                            )
                        }

                    </div>
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" onChange={e => handlerForm(e)} value={inputForm.firstname} name="firstname" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                        <label htmlFor="firstname" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" onChange={e => handlerForm(e)} value={inputForm.lastname} name="lastname" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
                        <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">

                    {file ?
                        (<div className="object-scale-down flex flex-col items-center justify-center w-40 h-fit border-2 border-gray-500 border rounded-lg cursor-pointer bg-slate-200" >
                            <button onClick={delFile} type="button" className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-500">X</button>
                            <img className="object-scale-down flex flex-col items-center justify-center w-24 h-32 rounded-lg shadow-slate-700" src={file} alt="avatar" />
                        </div>) :
                        (<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-slate-50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-4 h-4 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-slate-300">PNG or JPG (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" onChange={handleChange} value={inputForm.avatar} type="file" className="hidden" />
                        </label>)}
                </div>
                <br />

                {
                    inputForm.email !== "" && inputForm.password !== "" && inputForm.repeatPassword !== "" && inputForm.firstname !== "" && inputForm.lastname !== "" && inputForm.avatar !== "" ? (<button type="submit" onClick={e => handleSubmit(e)} className="text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>) : (<button disabled type="submit" className="disabled text-slate-300 bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>)
                }

            </form>

        </>
    )
}

export default CreateAccount