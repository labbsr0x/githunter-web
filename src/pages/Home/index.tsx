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
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import _ from 'lodash';

import Api, { RepositoryStats } from '../../services/api';
import GraphCard from '../../components/GraphCard/GraphCard';

const api = new Api();

interface Languages {
  key: number;
  label: string;
}

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
    card: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const providers = ['github', 'gitlab'];

const Home: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<RepositoryStats[]>([]);
  const [queryFilter, setQueryFilter] = useState('');
  const [providersSelected, setProviderSelected] = useState(new Map());
  const [languages, setLanguages] = React.useState<Languages[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  useEffect(() => {
    api.getAllRepositories().then(response => {
      setCards(response);
    });

    providers.forEach(provider => {
      setProviderSelected(p => new Map(p.set(provider, false)));
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

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleDeleteLanguage = (languageToDelete: Languages) => () => {
    setLanguages(previous =>
      previous.filter(language => language.key !== languageToDelete.key),
    );
  };

  return (
    <Container maxWidth="md" className={classes.root}>
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
                <InputLabel htmlFor="component-simple">Languages</InputLabel>
                <Input id="component-simple" />
              </FormControl>

              <div className={classes.languages}>
                {languages.map(language => (
                  <li key={language.key}>
                    <Chip
                      label={language.label}
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
          <Button size="small" color="primary">
            Apply
          </Button>
        </AccordionActions>
      </Accordion>

      <Grid container spacing={4}>
        {Array.isArray(cards) &&
          cards.map(card => (
            <Grid className={classes.card} item xs={12} sm={6} md={4}>
              <GraphCard {...card} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
