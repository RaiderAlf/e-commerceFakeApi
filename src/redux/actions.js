import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    dispatch({
        type: 'GET_PRODUCTS',
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
            dispatch({
                type: 'GET_CATEGORY_PRODUCT',
                payload: response.data
            });
        });
};

export const addUser = (user) => (dispatch) => {
    dispatch({
        type: 'ADD_USER',
        payload: user.data
    })
}

export const removeUser = () => (dispatch) => {
    dispatch({
        type: 'REMOVE_USER',
        payload: []
    })
}

export const addCartProducts = (product) => (dispatch) => {
    dispatch({
        type: 'ADD_CART_PRODUCT',
        payload: product
    })
}

export const removeProduct = (productId) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: productId
    }
}

export const removeCartProducts = () => (dispatch) => {

    dispatch({
        type: 'REMOVE_CART_PRODUCTS',
        payload: []
    })
}


export function filterByName(payload) {
    return {
        type: 'GET_FILTER_PRODUCTS',
        payload
    };
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    };
}