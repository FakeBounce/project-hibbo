/* @flow */
import './App.scss';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { ContainerApp } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';

// Pages
import Fields from '../fields/FieldsPage';
import Users from '../users/UsersPage';
import Home from '../home/HomePage';
import Intl from '../intl/IntlPage';
import Me from '../me/MePage';
import NotFound from '../notfound/NotFoundPage';
import Offline from '../offline/OfflinePage';
import SignIn from '../auth/SignInPage';
import Todos from '../todos/TodosPage';
import Map from '../map/MapPage';
import Dungeons from '../dungeons/DungeonsPage';
import Editor from '../editor/EditorPage';


// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

let App = ({ currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    theme={themes[currentTheme] || themes.initial}
  >
    <ContainerApp className="container_app">
      <Match exactly pattern="/" component={SignIn} />
      <Match authorized pattern="/game" component={Dungeons} />
      <Match pattern="/map" component={Map} />
      <Match pattern="/editor" component={Editor} />
      <Miss component={NotFound} />
    </ContainerApp>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(state => ({
  currentLocale: state.intl.currentLocale,
  currentTheme: state.themes.currentTheme,
}))(App);

export default start(App);
