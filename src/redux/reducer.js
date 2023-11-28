const initialState = {
    product: [],
    allProducts: [],
    cartProducts: [],
    user: [],
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

        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'ADD_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'GET_CATEGORY_PRODUCT':
            return {
                ...state,
                product: action.payload
            };

        case 'REMOVE_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'REMOVE_CART_PRODUCTS':
            return {
                ...state,
                cartProducts: action.payload
            };

        default:
            return state;
    }


}


export default rootReducer;