import { configureStore, createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: {},
  reducers: {
    setCv: (_state, action) => action.payload
  }
});

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    status: 'not-loaded',
    themeOptions: {
      paletteType: 'light'
    },
    filter: {
      drawerVisible: false
    },
    selectedTimelineElement: 0
  },
  reducers: {
    togglePaletteType: state => {
      state.themeOptions.paletteType =
        state.themeOptions.paletteType === 'light' ? 'dark' : 'light';
    },
    setSelectedTimelineElement: (state, action) => {
      state.selectedTimelineElement = action.payload;
    },
    setFilterDrawerVisible: (state, action) => {
      state.filter.drawerVisible = action.payload;
    },
    setFilter: (state, { payload: { categories, skills } }) => {
      state.filter.categories = categories;
      state.filter.skills = skills;
    },
    setSkillSelected: (state, { payload: { skillIndex, selected } }) => {
      state.filter.skills[skillIndex].selected = selected;
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
