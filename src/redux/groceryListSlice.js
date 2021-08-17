import {createSlice} from '@reduxjs/toolkit';

const groceryListSlice = createSlice({
  name: 'GroceryList',
  initialState: [],
  reducers: {
    addToList: (state, action) => {
      const newProduct = {
        id: action.payload.id,
        title: action.payload.product,
        status: action.payload.status,
        priority: action.payload.priority,
        history: [action.payload.date],
      };
      return [...state, newProduct];
    },
    // removeFromList: (state, action) => {
    //   const newState = state.filter(item => item.id !== action.payload.id);
    //   console.log({newState});
    //   return [...newState];
    // },
    // updateList: (state, action) => {
    //   const {id, value} = action.payload;
    //   const index = state.findIndex(item => item.id === id);
    //   state[index].completed = value;
    // },
  },
});

export const {addToList, removeFromList, updateList} = groceryListSlice.actions;
export default groceryListSlice.reducer;
