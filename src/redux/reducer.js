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
                product: action.payload,
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

        case 'GET_CATEGORY_PRODUCT':
            return {
                ...state,
                product: action.payload
            };

        default:
            return state;
    }


}


export default rootReducer;