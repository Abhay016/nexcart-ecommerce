const initialState = {
  products: null,
  productById: null,
  categories: null,
  relatedProducts: [], 
  pagination: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "FETCH_PRODUCT_BY_ID":
      return {
        ...state,
        productById: action.payload,
      };

    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "FETCH_RELATED_PRODUCTS":
      return {
        ...state,
        relatedProducts: action.payload,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    default:
      return state;
  }
};
