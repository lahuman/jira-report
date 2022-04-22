import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocalizationProvider } from '@material-ui/pickers';
import 'moment/locale/ko';
import moment from 'moment';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={MomentUtils} dateFormats={moment().format('YYYY-MM-DD')}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
