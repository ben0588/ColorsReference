import { createSlice } from '@reduxjs/toolkit';

export const colorSlice = createSlice({
    name: 'colors',
    initialState: [],
    reducers: {
        createColor(state, action) {
            state.push(action.payload);
        },
        updateColor(state, action) {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index].colorsList = action?.payload?.colorsList;
        },
        removeColor(state, action) {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        removeAllColor(state, action) {
            return [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase('persist/PURGE', (state, action) => {
            return [];
        });
    },
});

export const { createColor, updateColor, removeColor, removeAllColor } = colorSlice.actions;

export default colorSlice.reducer;
