import { configureStore, createSlice } from '@reduxjs/toolkit';

export const cvSlice = createSlice({
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

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { view: CurrentView.TIMELINE },
  reducers: {
    setCurrentView: (state, action) => {
      state.view = action.payload;
    }
  }
});

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cv: cvSlice.reducer
  }
});
