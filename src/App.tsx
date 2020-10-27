import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />

      <Container component="main" className={classes.content}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
