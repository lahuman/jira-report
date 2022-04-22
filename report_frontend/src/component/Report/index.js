import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import ReportTable from '../ReportTable';
import SearchBar from '../SearchBar';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(8),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }));

export default ({isLoading, setIsLoading}) => {
    const classes = useStyles();
    const [data, setData] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState([]);
    // 최근 4일간 조회 처리 
    const [dateRange, setDateRange] = React.useState([moment().subtract(4, 'days'), moment()]);
    const dateRangeRef = React.useRef([...dateRange]);
    const [searchName, setSearchName] = React.useState("");
    return <>        {/* Hero unit */}
    <SearchBar dateRange={dateRange}  isLoading={isLoading} setIsLoading={setIsLoading} dateRangeRef={dateRangeRef} setUserInfo={setUserInfo} setDateRange={setDateRange} searchName={searchName} setSearchName={setSearchName} setData={setData}  />
    <Grid container spacing={40} className={classes.cardGrid} >
      <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* End hero unit */}
        <ReportTable dateRangeRef={dateRangeRef} data={data} userInfo={userInfo}  searchName={searchName} />
      </Grid>
    </Grid></>
}