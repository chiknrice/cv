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
    setFilterDrawerOpen: state => {
      state.filter.drawerVisible = true;
    },
    setFilter: (state, { payload: { categories, skills } }) => {
      state.filter.categories = categories;
      state.filter.skills = skills;
    },
    setFilterDrawerClose: (state, { payload: selectedIndexes }) => {
      state.filter.skills.forEach((skill, index) => {
        if (skill.selected && !selectedIndexes.includes(index)) {
          skill.selected = false;
        } else if (!skill.selected && selectedIndexes.includes(index)) {
          skill.selected = true;
        }
      });
      state.filter.drawerVisible = false;
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
