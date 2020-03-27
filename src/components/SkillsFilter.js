import React, { useState } from 'react';
import {
  Typography,
  Drawer,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from 'store';
import {
  filterDrawerVisibleSelector,
  categoriesLookupSelector,
  usedCategoriesSelector,
  skillsLookupSelector,
  usedSkillsSelector,
  hasSkillFilterSelector
} from 'store/selectors';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '250px',
    padding: '10px'
  },
  select: { width: '100%' },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px'
  },
  filterContainer: {
    overflow: 'scroll',
    margin: 0,
    padding: 0
  },
  filter: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    paddingLeft: '10px'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}));

const CategoryDropDown = ({ selected, handleCategorySelected }) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesLookupSelector);
  const usedCategories = useSelector(usedCategoriesSelector);
  const hasSkillFilter = useSelector(hasSkillFilterSelector);
  const skills = useSelector(skillsLookupSelector);

  const classes = useStyles();
  return (
    <>
      <Box className={classes.label}>
        <Typography variant="h6">Categories</Typography>
        {hasSkillFilter ? (
          <IconButton
            color="inherit"
            onClick={() =>
              skills
                .filter(s => s.selected)
                .forEach(({ index: skillIndex }) =>
                  dispatch(
                    uiActions.setSkillSelected({
                      skillIndex,
                      selected: false
                    })
                  )
                )
            }
          >
            <Clear size="small" />
          </IconButton>
        ) : null}
      </Box>
      <Select
        className={classes.select}
        value={selected}
        displayEmpty
        onChange={({ target: { value } }) => handleCategorySelected(value)}
      >
        {usedCategories.map(index => (
          <MenuItem key={index} value={index}>
            {categories[index].name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const SkillFilters = ({ category }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(categoriesLookupSelector);
  const skills = useSelector(skillsLookupSelector);
  const usedSkills = useSelector(usedSkillsSelector);
  const activeSkills = categories[category].skills.filter(skill =>
    usedSkills.includes(skill)
  );

  return (
    <Box className={classes.filterContainer}>
      {activeSkills.map(skillIndex => {
        const skill = skills[skillIndex];
        return (
          <FormControlLabel
            key={skillIndex}
            className={classes.filter}
            labelPlacement="start"
            control={
              <Switch
                checked={skill.selected}
                onChange={({
                  target: { value: skillIndex, checked: selected }
                }) =>
                  dispatch(uiActions.setSkillSelected({ skillIndex, selected }))
                }
                value={skillIndex}
              />
            }
            label={skill.name}
          />
        );
      })}
    </Box>
  );
};

export const SkillsFilter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterDrawerVisible = useSelector(filterDrawerVisibleSelector);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <Drawer
      anchor="right"
      open={filterDrawerVisible}
      onClose={() => dispatch(uiActions.setFilterDrawerVisible(false))}
    >
      <Box className={classes.drawer}>
        <Typography variant="h4">Filter Skills</Typography>
        <Divider className={classes.divider} />
        <CategoryDropDown
          selected={selectedCategory}
          setSele
          handleCategorySelected={categoryIndex =>
            setSelectedCategory(categoryIndex)
          }
        />
      </Box>
      {typeof selectedCategory === 'number' ? (
        <SkillFilters category={selectedCategory} />
      ) : null}
    </Drawer>
  );
};
