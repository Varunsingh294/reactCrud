import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_ITEM,
  CLEAR_ITEM,
} from '../actions';

const initialState = {
  data: [
    { id: 1, name: 'Varun', price: '100' },
    { id: 2, name: 'Ram', price: '200' },
    { id: 3, name: 'Shyam', price: '300' },
  ],
  currentItem: null,
};

const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        currentItem: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case SET_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case CLEAR_ITEM:
      return {
        ...state,
        currentItem: null,
      };
    default:
      return state;
  }
};

export default providerReducer;
