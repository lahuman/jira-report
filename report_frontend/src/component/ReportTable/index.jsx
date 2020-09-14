import React from 'react';

import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TableCell
} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  tableRoot: {
    width: "90vw",
    // marginTop: theme.spacing.unit * 3,
    maxHeight: "80vh",
  },
  table: {
    minWidth: 700,
    tableLayout: "fixed",
    position: "relative",
    borderCollapse: "collapse"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'auto'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: "2px",
  },
  tableRightBorder : { 
    borderWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid'
  }, // or borderTop: '1px solid red'
  tableFixed : {
    verticalAlign: "top", position: "sticky",
    top: 50, /* Don't forget this, required for the stickiness */
    background: "#f5f5f5",
    color: "black"
  }
}));


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default ({ dateRangeRef, data, maxMemberIdx, searchName }) => {
  const classes = useStyles();

  const getDateList = () => {
    const [start, end] = dateRangeRef.current;
    let tmpDate = moment(start);
    const listDays = [];
    while (tmpDate <= end) {
      listDays.push(moment(tmpDate).format('YYYY-MM-DD'));
      tmpDate = tmpDate.add(1, 'days');
    }
    return listDays;
  }
  const getWeekColor = (weekNum) => {
    switch (weekNum) {
      case 0:
        return "#ed6663";
      case 6:
        return "#4e89ae";
      default:
        return "#000000";
    }
  }
  const getWeekDayName = (weekNum) => {
    switch (weekNum) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
      default:
        return "";
    }
  }
  const tableHeaderColumnComponent = () => {
    return (<React.Fragment>
      {getDateList().map(d => <TableCell align="center" key={d} style={{ width: "200px", color: getWeekColor(moment(d).day()) }}>{d}/{getWeekDayName(moment(d).day())}</TableCell>)}
    </React.Fragment>);
  }

  return (<TableContainer component={Paper} className={classes.tableRoot} >
    <Table stickyHeader className={classes.table}>
      <TableHead>
        <StyledTableRow>
          <TableCell style={{ width: "100px" }} align="center">담당자</TableCell>
          {
            tableHeaderColumnComponent()
          }
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {data && data[maxMemberIdx.current] && Object.keys(data[maxMemberIdx.current]).filter(key => searchName === "" ? true : data[maxMemberIdx.current][key][0].displayName.includes(searchName)).map(key => data[maxMemberIdx.current][key] && <React.Fragment><StyledTableRow key={key} >
          <TableCell component="th" scope="row" style={{
            verticalAlign: "top", position: "sticky",
            top: 50, /* Don't forget this, required for the stickiness */
            background: "white",
            color: "black"
          }}>
            <Typography gutterBottom variant="h6" component="h4" align="center">
              {data[maxMemberIdx.current][key][0].displayName}
            </Typography>
          </TableCell>

          {data && data.map((d, idx) => (<TableCell key={idx} className={classes.tableRightBorder} style={{ verticalAlign: "top" }}>
            {d[key] && [].concat(d[key]).sort((a, b) => moment(a.started).valueOf() - moment(b.started).valueOf()).map(l => (
              <Grid item key={l.emailAddress + l.updated} style={{
                //  height: 180,
                marginBottom: "0.3rem"
              }}>
                <Card className={classes.card} >
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body2" gutterBottom>
                      <b>{l.summary}</b><br />
                      <pre style={{ whiteSpace: "pre-wrap" }}>{l.comment}</pre>
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      {moment(l.started).format("YYYY-MM-DD HH:mm")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <a href={process.env.REACT_APP_API_JIRA_BROWSE + l.key} target="_blank" rel="noopener noreferrer">{l.key}</a>
                    </Button>
                    <Button size="small">
                      <a href={process.env.REACT_APP_API_JIRA_BROWSE + l.key} target="_blank" rel="noopener noreferrer" style={{ color: 'red', fontWeight: 'bold' }}>{l.timeSpent}</a>
                    </Button>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </TableCell>)
          )}
        </StyledTableRow>
          <StyledTableRow>
            <TableCell style={{ width: "100px" }} align="center" className={classes.tableFixed}>
              <Typography gutterBottom variant="subtitle2" align="center">총 SUM</Typography>
            </TableCell>
            {data && data.map((d, idx) => (<TableCell key={idx} align="center">
              {d[key] && d[key].reduce((acc, cur, currentIndex, array) => {
                const day = cur.timeSpent.match(/(\d{1,2})d/);
                const hour = cur.timeSpent.match(/(\d{1,2})h/);
                const min = cur.timeSpent.match(/(\d{1,2})m/);
                if (day && day.length > 1) {
                  acc += parseInt(day[1]) * 8 * 60;
                }
                if (hour && hour.length > 1) {
                  acc += parseInt(hour[1]) * 60;
                }
                if (min && min.length > 1) {
                  acc += parseInt(min[1]);
                }
                if (currentIndex + 1 === array.length) {
                  const totalHour = Math.floor(acc / 60);
                  const totalMin = acc % 60;
                  return `${totalHour === 0 ? "" : `${totalHour}시간`} ${totalMin === 0 ? "" : `${totalMin}분`}`;
                }
                return acc;
              }, 0)}
            </TableCell>))}
          </StyledTableRow>
        </React.Fragment>
        )}

      </TableBody>
    </Table>
  </TableContainer>);
}