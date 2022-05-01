'use strict'
const { callJiraAPI } = require('../util/apiInstance');
require('moment-timezone');
const moment = require('moment');
moment.tz.setDefault(process.env.TIME_ZONE);

const makeDateList = ({ start, end }) => {
  let tmpDate = moment(start);
  const listDays = [];
  while (tmpDate <= end) {
    listDays.push(moment(tmpDate).format('YYYY-MM-DD'));
    tmpDate = tmpDate.add(1, 'days');
  }
  return listDays
}

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const getReportByDate = async ({ reportDate }) => {
  const standardTimeStamp = moment(reportDate);
  const body = {
    "jql": `worklogDate >= "${reportDate}" AND worklogDate < "${moment(reportDate).add(1, 'days').format('YYYY-MM-DD')}" `,
    "startAt": 0,
    "maxResults": 9000,
    "fields": [
      "summary"
    ]
  }
  const jqlResult = await callJiraAPI({ url: `${process.env.JIRA_HOST}/rest/api/2/search`, method: 'post', body });
  const issueList = jqlResult.issues.map(i => ({ id: i.id, key: i.key, summary: i.fields.summary, self: i.self }));

  const callWorklog = issueList.map((i) => callJiraAPI({ url: `${i.self}/worklog`, method: 'get' }));
  const worklogList = await Promise.all(callWorklog);
  const result = worklogList.reduce((acc, cur) => {
    const w = cur.worklogs.filter(w => standardTimeStamp.isSame(moment(w.started).format("YYYY-MM-DD"))).map(w => {
      const issue = issueList.filter(i => i.id === w.issueId)[0];
      return {
        started: w.started,
        updated: w.updated,
        comment: w.comment,
        accountId: `${w.author.accountId}&%${w.author.displayName}`,
        displayName: w.author.displayName,
        timeSpent: w.timeSpent,
        issueId: w.issueId,
        summary: issue.summary,
        key: issue.key,
        worklogId: w.id
      }
    });
    return [...acc, ...w];
  }, []) || [];
  const groupByEmail = groupBy(result, "accountId")
  return groupByEmail;
}


module.exports.getReport = async function getReport(req, res, next) {

  const start = moment(req.startDate.value);
  const end = moment(req.endDate.value);

  if (start.isValid() && end.isValid() && end.isBefore(moment())) {
    try {
      const data = await Promise.all(makeDateList({ start, end }).map(reportDate => getReportByDate({ reportDate })));
      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  } else {
    res.status(400).send({
      message: '시작일 또는 종료일이 잘못 되었습니다.'
    });
  }
};


