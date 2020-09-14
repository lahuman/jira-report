import React from 'react';

import {
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Select,
  MenuItem
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { DateRangePicker } from "@material-ui/pickers";
import apiInstance from '../../apiInstance';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    //padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ dateRange, setDateRange, searchName, setSearchName, isLoading, setIsLoading, maxMemberIdx, dateRangeRef, setData }) => {
  const classes = useStyles();
  const dateRangeInputRef = React.useRef(null);
  const handleDateRangeClick = (e) => {
    dateRangeInputRef.current.focus();
  }

  const handleSearch = React.useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    dateRangeRef.current = dateRange;
    const [start, end] = dateRange;
    try {
      const data = await apiInstance({ url: `/v2/report?startDate=${start.format('YYYY-MM-DD')}&endDate=${end.format('YYYY-MM-DD')}`, method: 'get' });
      setData(data);

      // 최대 사용자를 가진 배열 위치 확인
      let maxLen = 0;
      data.forEach((d, idx) => {
        const len = Object.keys(d).length;
        if (len > maxLen) {
          maxLen = len;
          maxMemberIdx.current = idx;
        }
      });
      if(!data[maxMemberIdx.current]){
        maxMemberIdx.current = 0;
      }
    } catch (e) {
      // alert(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, dateRange]);

  React.useEffect(() => {
    handleSearch();
  }, []);


  return <div className={classes.heroContent}>
    <Container maxWidth="md">
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <DateRangePicker
              startText="업무일자 기간"
              endText="업무일자 기간"
              value={dateRange}
              onChange={(newValue) => {
                setDateRange(newValue);
                // dateRangeRef.current = newValue;
              }}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              renderInput={({ inputProps, ...startProps }, endProps) => {
                startProps.helperText = '';
                const startValue = inputProps.value;
                delete inputProps.value;
                return (
                  <TextField
                    inputRef={dateRangeInputRef} size="small"
                    placeholder="" helperText=""
                    style={{ width: 250 }}
                    {...startProps}
                    InputProps={{
                      ...inputProps,
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size='small' onClick={handleDateRangeClick}>
                            <DateRangeIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    value={`${startValue} ~ ${endProps.inputProps.value}`}
                  />
                )
              }}
            />
          </Grid>
          <Grid item>
            <TextField placeholder="이름 필터" style={{ width: 250 }} value={searchName} onChange={(e) => setSearchName(e.target.value)}></TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleSearch()}>
              조회
          </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  </div>
}