import { configureStore, createSlice } from '@reduxjs/toolkit';

export {
  uiStatusSelector,
  uiErrorSelector,
  themeOptionsSelector,
  skillsSelector,
  categoriesSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  selectedExperienceSelector,
  workExperiencesSummarySelector,
  skillsByExperienceSelector,
  skillsTotalDurationSelector
} from './selectors';

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
    selectedTimelineElement: 0
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
    setSelectedTimelineElement: (state, action) => {
      state.selectedTimelineElement = action.payload;
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
