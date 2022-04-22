'use strict'

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const callJiraAPI = async ({ url, method, body }) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${process.env.JIRA_ID}:${process.env.TOKEN_KEY}`).toString(
        "base64"
      )}`
    },
  });
  const jsonResult = await res.json();
  return jsonResult;
}

module.exports = {
  callJiraAPI
}