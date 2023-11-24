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

export const removeFromCart = (item) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item
    }
}

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

export const removeCartProducts = () => (dispatch) => {

    dispatch({
        type: 'REMOVE_CART_PRODUCTS',
        payload: []
    })
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