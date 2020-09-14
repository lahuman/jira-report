import React from 'react';

import {
  CssBaseline,
  Container,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import AppHeader from './component/AppHeader'
import SearchBar from './component/SearchBar';
import AppFooter from './component/AppFooter';
import ReportTable from './component/ReportTable';
import Loadding from './component/Loadding';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
  },
}));


export default function Report() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const maxMemberIdx = React.useRef(0);
  // 최근 4일간 조회 처리 
  const [dateRange, setDateRange] = React.useState([moment().subtract(4, 'days'), moment()]);
  const dateRangeRef = React.useRef([...dateRange]);
  const [searchName, setSearchName] = React.useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      { isLoading && <Loadding />}
      <AppHeader />
      <main>
        {/* Hero unit */}
        <SearchBar dateRange={dateRange}  isLoading={isLoading} setIsLoading={setIsLoading} dateRangeRef={dateRangeRef} maxMemberIdx={maxMemberIdx} setDateRange={setDateRange} searchName={searchName} setSearchName={setSearchName} setData={setData}  />
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <ReportTable dateRangeRef={dateRangeRef} data={data} maxMemberIdx={maxMemberIdx} searchName={searchName} />
        </Container>
      </main>
      {/* Footer */}
      <AppFooter />
      {/* End footer */}
    </React.Fragment>
  );
}