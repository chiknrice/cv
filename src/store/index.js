import { configureStore, createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: {},
  reducers: {
    setCv: (_, action) => action.payload
  }
});

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    status: 'not-loaded',
    themeOptions: {
      paletteType: 'light'
    },
    selectedDate: 'first'
  },
  reducers: {
    fetchAppRequested: state => {
      state.status = 'loading';
    },
    fetchAppSuccess: state => {
      state.status = 'loaded';
    },
    fetchAppFailed: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
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
