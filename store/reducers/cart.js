import { ADD_TO_CART } from '../actions/cart'

import CartItem from '../../models/cart-item'

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            let cartItem

            if (state.items[addedProduct.id]) {
                // already have the item in the cart; update quantity
                cartItem  = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                // add new item
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: cartItem },
                totalAmount: state.totalAmount + prodPrice
            }
    }
    return state
}
