//HOOKS
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
//ACTIONS
import { getProducts } from "../redux/actions"
//COMPONENTS
import Card from "./card";
import NavBar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();

    let user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const allProducts = useSelector(state => state.product)

    const position = Math.floor(Math.random() * allProducts.length);

    return (
        <>
            <NavBar />
            <div className="bg-white/10">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>



                    <section className="bg-white [box-shadow:_0_0_10px_rgb(0_0_0_/_40%)] rounded-lg">
                        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div className="mr-auto place-self-center lg:col-span-7 p-2">
                                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Lorem ipsum dolor sit amet.</h1>
                                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magnam porro, cum quod ea suscipit est maiores beatae impedit facilis tenetur harum in pariatur adipisci.</p>

                                {
                                    user.firstname ? "" : (
                                        <div>
                                            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-slate-500 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                                                Get started
                                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </a>
                                            <Link to='/create' href="#" className="inline-flex items-center bg-slate-300 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                                                Create Account
                                            </Link>
                                            <span className="p-4 text-slate-500 text-base font-medium" >OR</span>
                                            <Link to='/create' href="#" className="inline-flex items-center bg-slate-300 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
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

                    <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {allProducts.length > 0 ? allProducts.map((product) => (
                            <Card key={product.id}
                                id={product.id}
                                title={product.title}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                rating={product.rating}
                            />
                        )) : (
                            <div className="flex flex-col justify-center items-center" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home