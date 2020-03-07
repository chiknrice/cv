import { configureStore, createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: { loading: true },
  reducers: {
    setCv: (_, action) => ({ ...action.payload, loading: false })
  }
});

export const CurrentView = {
  TIMELINE: 'TIMELINE',
  JOB_DETAIL: 'JOB_DETAIL'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    themeOptions: {
      paletteType: 'light'
    },
    view: CurrentView.TIMELINE,
    selectedDate: 'none'
  },
  reducers: {
    togglePaletteType: state => {
      state.themeOptions.paletteType =
        state.themeOptions.paletteType === 'light' ? 'dark' : 'light';
    },
    setCurrentView: (state, action) => {
      state.view = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate =
        state.selectedDate !== 'none' && state.selectedDate === action.payload
          ? 'none'
          : action.payload;
    },
    unsetSelectedDate: state => {
      delete state.selectedDate;
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
