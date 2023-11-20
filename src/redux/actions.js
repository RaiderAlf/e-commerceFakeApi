import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    dispatch({
        type: 'GET_DETAIL',
        payload: []
    });
    await axios.get("https://fakestoreapi.com/products")
        .then(response => {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: response.data
            });
        });
};

export const getCategoryProduct = (category) => async (dispatch) => {

    dispatch({
        type: 'GET_CATEGORY_PRODUCT',
        payload: []
    });

    await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => {
            console.log
            dispatch({
                type: 'GET_CATEGORY_PRODUCT',
                payload: response.data
            });
        });
};

export function addCartProducts(payload) {

    return {
        type: 'ADD_CART_PRODUCTS',
        payload
    };

}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    };

}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    };
}