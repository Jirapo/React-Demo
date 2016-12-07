import React from 'react';
import { Route } from 'react-router';

import store from './store';

import IndexPage from './routes/IndexPage';
import DatasrcPage from './routes/DatasrcPage';
import TbListPage from './routes/TbListPage';
import DatasrcEditPage from './routes/DatasrcEditPage';
import * as actions from './actions';


const routes = {
  path: '/',
  component: IndexPage,
  indexRoute: {component: DatasrcPage},
  childRoutes: [
    {
      path: 'tblist',
      component: TbListPage,
    },
    {
      path: 'dsudpt',
      component: DatasrcEditPage,
      // getComponent: ({location}, cb) => {
      //     const {query} = location

      //     if(query.id){
      //       store.dispatch({
      //         type: actions.QUERY_DATASRC,
      //         payload: query
      //       })
      //     }
      //     // store.dispatch(getAllTbList())
      //     cb(null, DatasrcEditPage)
      
      // }
    },
  ]
};

export default routes;
