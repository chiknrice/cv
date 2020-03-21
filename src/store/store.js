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
    filters: {
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
      state.filters.drawerVisible = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCategoriesSelected: (state, { payload: selectedIndexes }) => {
      state.filters.categories.forEach((category, index) => {
        if (category.selected && !selectedIndexes.includes(index)) {
          category.selected = false;
        } else if (!category.selected && selectedIndexes.includes(index)) {
          category.selected = true;
        }
      });
    },
    setSkillsSelected: (state, { payload: selectedIndexes }) => {
      state.filters.skills.forEach((skill, index) => {
        if (skill.selected && !selectedIndexes.includes(index)) {
          skill.selected = false;
        } else if (!skill.selected && selectedIndexes.includes(index)) {
          skill.selected = true;
        }
      });
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
