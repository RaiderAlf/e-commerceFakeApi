//HOOKS
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
//ACTIONS
import { getProducts } from "../redux/actions"
//COMPONENTS
import Card from "./card";
import NavBar from "./navbar";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const allProducts = useSelector(state => state.allProducts);

    return (
        <>
            <NavBar />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {allProducts?.map((product) => (
                            <Card key={product.id}
                                id={product.id}
                                title={product.title}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home