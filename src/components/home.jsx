//DEPENDENCIES
import Cookies from 'js-cookie';
//HOOKS
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//ACTIONS
import { addUser, getProducts } from "../redux/actions"
//COMPONENTS
import { Link } from "react-router-dom";
import Card from "./card";
import NavBar from "./navbar";
import Footer from "./footer";

const Home = () => {

    let user = useSelector(state => state.user)

    const dispatch = useDispatch();

    const [showBanner, setShowBanner] = useState(!Cookies.get('cookiesAccepted'));

    const acceptCookies = () => {
        Cookies.set('cookiesAccepted', 'true');
        if (Cookies.get('user')) {
            const actualUser = JSON.parse(Cookies.get('user'))
            dispatch(addUser(actualUser))
        }
        setShowBanner(false);
    };

    // if (!user && Cookies.get('user')) {
    //     const actualUser = JSON.parse(Cookies.get('user'))
    //     dispatch(addUser(actualUser))
    // }

    window.onload = () => {
        if (Cookies.get('user')) {
            const actualUser = JSON.parse(Cookies.get('user'))
            dispatch(addUser(actualUser))
        }
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const allProducts = useSelector(state => state.product)
    user = useSelector(state => state.user)

    const position = Math.floor(Math.random() * allProducts.length);

    return (
        <>
            <NavBar />
            <div className="bg-white/10">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>



                    <section className="bg-white [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)] my-4 rounded-lg">
                        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div className="mr-auto place-self-center lg:col-span-7 p-2">
                                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Lorem ipsum dolor sit amet.</h1>
                                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magnam porro, cum quod ea suscipit est maiores beatae impedit facilis tenetur harum in pariatur adipisci.</p>

                                {
                                    user.firstname ? ""
                                        :
                                        (
                                            <div>
                                                <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-500 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                                                    Get started
                                                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </a>
                                                <Link to='/create' href="#" className="inline-flex items-center bg-slate-300 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                                                    Create Account
                                                </Link>
                                                <span className="p-4 text-slate-500 text-base font-medium" >OR</span>
                                                <Link to='/signin' href="#" className="inline-flex items-center bg-slate-300 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                                                    Sign In
                                                </Link>
                                            </div>
                                        )
                                }

                            </div>
                            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
                                <img className="object-contain h-80 w-80" src={allProducts[position]?.image} alt="mockup" />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-center items-center p-8">
                        {allProducts.length > 0 ? (
                            <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {
                                    allProducts.map((product) => (
                                        <Card key={product.id}
                                            id={product.id}
                                            title={product.title}
                                            name={product.name}
                                            description={product.description}
                                            price={product.price}
                                            image={product.image}
                                            rating={product.rating}
                                        />
                                    ))
                                }
                            </div>
                        )
                            :
                            (
                                <div className="grid place-content-center loader" role="status"></div>
                            )
                        }
                    </div>

                </div>
            </div>
            {
                showBanner && (
                    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 flex items-center justify-between">
                        <div className="flex-1">
                            <p>This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
                        </div>
                        <button onClick={acceptCookies} className="ml-4 bg-white text-blue-500 px-4 py-2 rounded">Accept</button>
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default Home