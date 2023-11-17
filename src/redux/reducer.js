const initialState = {
    product: [],
    allProducts: [],
    temperament: [],
    detail: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload
            };

        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload
            }

        case 'GET_TEMPERAMENT':
            return {
                ...state,
                temperament: action.payload
            };

        case 'GET_DETAIL_PRODUCT':
            return {
                ...state,
                detail: action.payload
            };

        default:
            return state;
    }


}


export default rootReducer;