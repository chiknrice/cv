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
  Chip,
  InputLabel,
  FormControl,
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
  selectedSkillsSelector
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
    alignItems: 'center'
  },
  closeButton: {
    padding: 0,
    marginRight: 12
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
  },
  summaryContainer: {
    width: '250px',
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}));

const CategoryDropDown = ({ selectedCategory, handleCategorySelected }) => {
  const categories = useSelector(categoriesLookupSelector);
  const usedCategories = useSelector(usedCategoriesSelector);

  const classes = useStyles();
  return (
    <FormControl className={classes.select}>
      <InputLabel id="category-select-label">Categories</InputLabel>
      <Select
        labelId="category-select-label"
        value={selectedCategory}
        displayEmpty
        onChange={({ target: { value } }) => handleCategorySelected(value)}
      >
        {usedCategories.map(index => (
          <MenuItem key={index} value={index}>
            {categories[index].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SkillFilters = ({ category, selectedSkills, handleFilterChange }) => {
  const classes = useStyles();
  const categories = useSelector(categoriesLookupSelector);
  const skillsLookup = useSelector(skillsLookupSelector);
  const usedSkills = useSelector(usedSkillsSelector);
  const activeSkills = categories[category].skills.filter(skill =>
    usedSkills.includes(skill)
  );

  return (
    <Box className={classes.filterContainer}>
      {activeSkills.map(skillIndex => {
        return (
          <FormControlLabel
            key={skillIndex}
            className={classes.filter}
            labelPlacement="start"
            control={
              <Switch
                checked={selectedSkills.has(skillIndex)}
                onChange={handleFilterChange}
                value={skillIndex}
              />
            }
            label={skillsLookup[skillIndex].name}
          />
        );
      })}
    </Box>
  );
};

const SelectedSkillsSummary = ({ selectedSkills }) => {
  const skillsLookup = useSelector(skillsLookupSelector);
  const classes = useStyles();

  return (
    <Box className={classes.summaryContainer}>
      {[...selectedSkills].map(index => (
        <Chip
          key={index}
          size="small"
          variant="outlined"
          label={skillsLookup[index].name}
        />
      ))}
    </Box>
  );
};

export const SkillsFilterDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterDrawerVisible = useSelector(filterDrawerVisibleSelector);
  const alreadySelectedSkills = useSelector(selectedSkillsSelector);
  const [selectedCategory, setSelectedCategory] = useState('');
  // wrapping with array to maintain the same mutable set
  const [[selectedSkills], setSelectedSkills] = useState([
    new Set(alreadySelectedSkills)
  ]);

  const handleFilterChange = ({ target: { checked, value: index } }) => {
    if (checked) {
      selectedSkills.add(parseInt(index));
    } else {
      selectedSkills.delete(parseInt(index));
    }
    setSelectedSkills([selectedSkills]);
  };

  return (
    <Drawer
      anchor="right"
      open={filterDrawerVisible}
      onClose={() =>
        dispatch(uiActions.setFilterDrawerClose([...selectedSkills]))
      }
    >
      <Box className={classes.drawer}>
        <Box className={classes.label}>
          <Typography variant="h6">Filter Skills</Typography>
          {selectedSkills.size > 0 ? (
            <IconButton
              className={classes.closeButton}
              color="inherit"
              onClick={() => {
                selectedSkills.clear();
                setSelectedSkills([selectedSkills]);
              }}
            >
              <Clear size="small" />
            </IconButton>
          ) : null}
        </Box>
        <Divider className={classes.divider} />
        <CategoryDropDown
          selectedCategory={selectedCategory}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          handleCategorySelected={categoryIndex =>
            setSelectedCategory(categoryIndex)
          }
        />
      </Box>
      {typeof selectedCategory === 'number' ? (
        <SkillFilters
          category={selectedCategory}
          selectedSkills={selectedSkills}
          handleFilterChange={handleFilterChange}
        />
      ) : (
        <SelectedSkillsSummary selectedSkills={selectedSkills} />
      )}
    </Drawer>
  );
};
