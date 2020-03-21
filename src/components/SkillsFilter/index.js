import React from 'react';
import {
  Typography,
  Drawer,
  Container,
  Box,
  Divider,
  Select,
  MenuItem,
  Chip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from 'store';
import {
  filterDrawerVisibleSelector,
  categoriesLookupSelector,
  selectedCategoriesSelector,
  skillsLookupSelector,
  selectedSkillsSelector
} from 'store/selectors';

const useStyles = makeStyles(theme => ({
  select: { width: '100%' },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  drawer: {
    width: '300px',
    paddingTop: '40px'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}));

const Options = ({ options, selected, updateSelected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Select
      className={classes.select}
      labelId="demo-mutiple-chip-label"
      id="demo-mutiple-chip"
      multiple
      displayEmpty
      value={selected}
      onChange={({ target: { value } }) => dispatch(updateSelected(value))}
      renderValue={selected => (
        <Box className={classes.chips}>
          {selected.length === 0
            ? 'Select Any'
            : selected.map(index => (
                <Chip
                  key={index}
                  label={options[index].name}
                  size="small"
                  variant="outlined"
                />
              ))}
        </Box>
      )}
    >
      {options.map(({ name }, index) => (
        <MenuItem key={index} value={index}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};

const SelectionLabel = ({ label, selectedItems, setSelectedAction }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Box className={classes.label}>
      <Typography variant="h6">{label}</Typography>
      {selectedItems.length > 0 ? (
        <IconButton
          color="inherit"
          onClick={() => dispatch(setSelectedAction([]))}
        >
          <Clear size="small" />
        </IconButton>
      ) : null}
    </Box>
  );
};

export const SkillsFilter = ({ visible }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterDrawerVisible = useSelector(filterDrawerVisibleSelector);
  const categories = useSelector(categoriesLookupSelector);
  const selectedCategories = useSelector(selectedCategoriesSelector);
  const skills = useSelector(skillsLookupSelector);
  const selectedSkills = useSelector(selectedSkillsSelector);

  return (
    <Drawer
      anchor="right"
      open={filterDrawerVisible}
      onClose={() => dispatch(uiActions.setFilterDrawerVisible(false))}
    >
      <Container maxWidth="xs" className={classes.drawer}>
        <Typography variant="h4">Filter Skills</Typography>
        <Divider className={classes.divider} />
        <SelectionLabel
          label="Categories"
          selectedItems={selectedCategories}
          setSelectedAction={uiActions.setCategoriesSelected}
        />
        <Options
          selected={selectedCategories}
          options={categories}
          updateSelected={uiActions.setCategoriesSelected}
        />
        <Divider className={classes.divider} />
        <SelectionLabel
          label="Skills"
          selectedItems={selectedSkills}
          setSelectedAction={uiActions.setSkillsSelected}
        />
        <Options
          selected={selectedSkills}
          options={skills}
          updateSelected={uiActions.setSkillsSelected}
        />
      </Container>
    </Drawer>
  );
};
