import React, { useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import _ from 'lodash';

import { Skeleton } from '@material-ui/lab';
import { Card } from '@material-ui/core';
import Api, { RepositoryStats, Language } from '../../services/api';
import GraphCard from '../../components/GraphCard/GraphCard';

const api = new Api();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    searchBar: {
      display: 'flex',
      flex: 1,
      height: theme.spacing(6),
      borderRadius: theme.spacing(0.5, 0.5, 0, 0),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    advanced: {
      borderRadius: theme.spacing(0, 0, 0.5, 0.5),
      margin: theme.spacing(0, 0, 2),
    },
    languages: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: theme.spacing(1, 1, 0, 0),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    column: {
      flexDirection: 'column',
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<RepositoryStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryFilter, setQueryFilter] = useState('');
  const [providers, setProviders] = useState<string[]>([]);
  const [providersSelected, setProviderSelected] = useState(new Map());
  const [languagesAvailable, setLanguagesAvailable] = React.useState<
    Language[]
  >([]);
  const [inputLanguage, setInputLanguage] = React.useState<string>('');
  const [selectLanguage, setSelectLanguage] = React.useState<string | null>('');
  const [languagesForFilter, setLanguagesForFilter] = React.useState<string[]>(
    [],
  );
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  useEffect(() => {
    api.getAllRepositories().then(response => {
      setCards(response);
      setIsLoading(false);
    });

    api.getLanguages().then(response => {
      setLanguagesAvailable(response);
    });

    api.getProviders().then(response => {
      const temp: string[] = [];

      response.forEach(provider => {
        setProviderSelected(
          previous => new Map(previous.set(provider.name, false)),
        );
        temp.push(provider.name);
      });

      setProviders(temp);
    });
  }, []);

  const delayedSearch = useCallback(
    _.debounce(query => {
      api.getAllRepositories({ filtersString: query }).then(response => {
        setCards(response);
      });
    }, 500),
    [],
  );

  const handleChangeQueryFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQueryFilter(event.target.value);
    delayedSearch(event.target.value);
  };

  const handleChangeProviders = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = providersSelected.get(event.target.name);
    setProviderSelected(
      new Map(providersSelected.set(event.target.name, !checked)),
    );
  };

  const handleChangeLanguage = (
    event: React.ChangeEvent<Record<string, unknown>>,
    value: string,
  ) => {
    setInputLanguage(value);
  };

  const handleAddLanguage = (
    event: React.ChangeEvent<Record<string, unknown>>,
    value: string | null,
  ) => {
    if (value) {
      event.preventDefault();

      setLanguagesForFilter(previous => {
        return previous.filter(language => language === value).length
          ? [...languagesForFilter]
          : [...languagesForFilter, value];
      });

      setInputLanguage('');
      setSelectLanguage('');
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleDeleteLanguage = (languageToDelete: string) => () => {
    setLanguagesForFilter(previous =>
      previous.filter(language => language !== languageToDelete),
    );
  };

  const handleSearch = () => {
    api
      .getAllRepositories({
        filtersString: queryFilter,
        languages: languagesForFilter,
        providers: providers.filter(provider =>
          providersSelected.get(provider),
        ),
      })
      .then(response => {
        setCards(response);
      });
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper component="form" className={classes.searchBar}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={queryFilter}
          onChange={handleChangeQueryFilter}
        />
      </Paper>

      <Accordion className={classes.advanced}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filters-content"
          id="filters-header"
        >
          <Typography>Advanced filters</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={7}>
            <Grid item xs={12} md>
              <FormControl component="fieldset">
                <FormLabel>Providers</FormLabel>
                <FormGroup>
                  {Array.isArray(providers) &&
                    providers.map(provider => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={providersSelected.get(provider) || false}
                            onChange={handleChangeProviders}
                            name={provider}
                          />
                        }
                        label={
                          provider.charAt(0).toUpperCase() + provider.slice(1)
                        }
                      />
                    ))}
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Autocomplete
                  id="add-language"
                  value={selectLanguage}
                  onChange={handleAddLanguage}
                  inputValue={inputLanguage}
                  onInputChange={handleChangeLanguage}
                  options={
                    Array.isArray(languagesAvailable)
                      ? languagesAvailable.map(language => language.name)
                      : []
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Languages"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>

              <div className={classes.languages}>
                {Array.isArray(languagesForFilter) &&
                  languagesForFilter.map(language => (
                    <li key={language}>
                      <Chip
                        label={language}
                        onDelete={handleDeleteLanguage(language)}
                        className={classes.chip}
                      />
                    </li>
                  ))}
              </div>
            </Grid>

            <Grid item xs={12} md>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center" className={classes.column}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inital"
                    label="To"
                    value={startDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change initial date',
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-end"
                    label="From"
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change end date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </AccordionDetails>

        <Divider />
        <AccordionActions>
          <Button size="small" color="primary" onClick={handleSearch}>
            Apply
          </Button>
        </AccordionActions>
      </Accordion>

      <Grid container spacing={4}>
        {isLoading
          ? [...Array(6)].map(() => (
              <Grid
                style={{
                  display: 'grid',
                  justifyContent: 'center',
                }}
                item
                xs={12}
                md={6}
              >
                <Card style={{ backgroundColor: '#f1f0f0', padding: 12 }}>
                  <Grid
                    container
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Skeleton
                      style={{ marginRight: 12 }}
                      variant="circle"
                      width={34}
                      height={34}
                    />
                    <Skeleton variant="text" width="82%" />
                  </Grid>
                  <Skeleton
                    variant="rect"
                    width={window.innerWidth > 375 ? 408 : 284}
                    height={288}
                    style={{
                      borderRadius: 4,
                      marginBottom: 8,
                    }}
                  />
                  <Grid
                    container
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Skeleton
                      style={{ marginRight: 12 }}
                      variant="circle"
                      width={34}
                      height={34}
                    />
                    <Skeleton
                      style={{ marginRight: 12 }}
                      variant="circle"
                      width={34}
                      height={34}
                    />
                    <Skeleton
                      style={{ marginRight: 12 }}
                      variant="circle"
                      width={34}
                      height={34}
                    />
                  </Grid>
                </Card>
              </Grid>
            ))
          : Array.isArray(cards) &&
            cards.map(card => (
              <Grid item xs={12} md={6}>
                <GraphCard
                  dataCard={card}
                  configPlot={{
                    width: window.innerWidth > 375 ? 500 : 284,
                    height: 242,
                    outerRadius: window.innerWidth > 375 ? 102 : 88,
                    positionX: window.innerWidth > 375 ? 500 / 2 : 284 / 2,
                    color: '#3f51b5',
                  }}
                />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default Home;
