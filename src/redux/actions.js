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

export const getTemperament = () => async (dispatch) => {
    try {
        const response = await axios.get('https://dogsapi-nhcb.onrender.com/temperament/');
        console.log(response.data)
        dispatch({
            type: 'GET_TEMPERAMENT',
            payload: response.data.results
        });
    } catch (error) {
        console.log(error);
    }
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

export const getDogName = (name) => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_DOG_NAME',
            payload: []
        });

        await axios.get('https://dogsapi-nhcb.onrender.com/dogs?name=' + name)
            .then(response =>
                dispatch({
                    type: 'GET_DOG_NAME',
                    payload: response.data.results
                }));
    } catch (error) {
        dispatch({
            type: 'GET_DOG_NAME',
            payload: [false]
        });
    }

};

export function filterDogsByTemperament(payload) {
    console.log(payload)
    return {
        type: 'FILTER_BY_TEMPERAMENT',
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