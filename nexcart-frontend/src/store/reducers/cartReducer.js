const initialState = {
    cartItems: [
        {
            cartItemId: 22,
            productId: 17,
            productName: "Summer Dress",
            price: 1999.0,
            specialPrice: 1499.25,
            discount: 25.0,
            cartQuantity: 2,
        },
        {
            cartItemId: 23,
            productId: 18,
            productName: "Wireless Earbuds",
            price: 129.0,
            specialPrice: 99.0,
            discount: 23.0,
            cartQuantity: 1,
        },
    ],
    totalPrice: 0,
    cartId: 2,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.productId === productToAdd.productId
            );

            if (existingItem) {
                const updatedItems = state.cartItems.map((item) =>
                    item.productId === productToAdd.productId
                        ? { ...item, cartQuantity: productToAdd.cartQuantity }
                        : item
                );

                return {
                    ...state,
                    cartItems: updatedItems,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, productToAdd],
                };
            }

        case "REMOVE_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.productId !== action.payload.productId
                ),
            };

        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalPrice: action.payload.totalPrice,
                cartId: action.payload.cartId,
            };

        case "CLEAR_CART":
            return { cartItems: [], totalPrice: 0, cartId: null };

        default:
            return state;
    }
};
