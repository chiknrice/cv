import { configureStore, createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: { loading: true },
  reducers: {
    setCv: (_, action) => ({ ...action.payload, loading: false })
  }
});

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    themeOptions: {
      paletteType: 'light'
    },
    selectedDate: 'first'
  },
  reducers: {
    togglePaletteType: state => {
      state.themeOptions.paletteType =
        state.themeOptions.paletteType === 'light' ? 'dark' : 'light';
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    }
  }
});

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cv: cvSlice.reducer
  }
});

export const uiActions = uiSlice.actions;
export const cvActions = cvSlice.actions;
