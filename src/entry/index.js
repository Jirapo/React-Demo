import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, browserHistory, useRouterHistory  } from 'react-router';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';

import store from '../store';
import routes from '../router';

const appLocale = window.appLocale;
addLocaleData(appLocale.data);

render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
      </Provider>
    </IntlProvider>
  </LocaleProvider>
  ,
  document.getElementById('root')
);
