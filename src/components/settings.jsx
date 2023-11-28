//DEPENDENCIES
import axios from "axios";
//HOOKS
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
//ACTIONS
import { addUser, removeUser } from "../redux/actions";
//COMPONENTS
import NavBar from "./navbar";

const Settings = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        console.log(inputForm, file)

        e.preventDefault();

        dispatch(removeUser())

        axios.post('https://microservices-api.onrender.com/register', inputForm)
            .then(data => dispatch(addUser(data.data)), navigate('/'))

    };

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
            <NavBar />
            <form className="max-w-sm mx-auto my-28">
                <h1 className="text-slate-500 text-lg text-center font-medium my-8 [text-shadow:_0_5px_5px_rgb(0_0_0_/_50%)]">
                    Settings User
                </h1>
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
                                <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Optional</span></p>
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
                <div className="relative z-0 w-full mb-5 group">
                    <button type="submit" onClick={e => handleSubmit(e)} className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Delete Account</button>
                </div>

                <br />

                <div className="flex items-center gap-5 justify-between">

                    <Link to='/' className="flex gap-2 items-center text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <span>
                            Back
                        </span>
                    </Link>

                    <button type="submit" onClick={e => handleSubmit(e)} className="text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>


                </div>
            </form>

        </>
    )
}

export default Settings