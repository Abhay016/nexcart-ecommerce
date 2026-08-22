const initialState = { reviews: [], isLoading: false, errorMessage: null };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return { ...state, isLoading: true, errorMessage: null };
    case "FETCH_REVIEWS_BY_PRODUCT":
      return { ...state, reviews: action.payload, isLoading: false };
    case "IS_SUCCESS":
      return { ...state, isLoading: false };
    case "IS_ERROR":
      return { ...state, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};
