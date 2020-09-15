export const initialState = {
    basket: [],
    user: null
};

//Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            //copy the basket into a new variable
            let newBasket = [...state.basket];
            
            //if item can be found, splice is cutting it by 1. if cant be found, output warning statement
            if (index >=0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    'Cant remove product (id: ${action.id}) as it is not in the basket!'

                )
            }

            //return the current state and the newBasket defined
            return {
                ...state,
                basket: newBasket
            }
        
        case 'SET_USER':
            return {
                //return everything currently in the state
                ...state,
                //update the user from the dispatch
                user: action.user


            }
        default: 
            return state;
    }
};

export default reducer;