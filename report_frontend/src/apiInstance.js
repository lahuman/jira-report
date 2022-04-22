import fetch from 'node-fetch';

export default async ({ url, method, body }) => {
  console.log(process.env.REACT_APP_API_URL)
  const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });
  const response = await res.json();
  if(res.status.toString().indexOf("20") === 0) {
    return response;
  } else  if(res.status === 403) {
    alert(response.message);
    window.location.href = '/login';
  }else{
    alert(response.message);
    return undefined;
  }
}