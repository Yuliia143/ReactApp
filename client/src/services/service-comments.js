import React from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const getLecture = async (lectureId) => {
  const token = window.localStorage.getItem("Access-Token");
  const result = await axios(`${BASE_URL}/api/lectures/${lectureId}`, {
    headers: {
      "Access-Token": token,
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: false,
  });
  return result.data;
};

// export default class PostComment {
//   myUrl =
//     "https://glacial-chamber-22605.herokuapp.com/api/lectures/5e935cc29f474d31420b243a/messages";
//   myfunc = async function postData(url = "", data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       mode: "cors", // no-cors, *cors, same-origin
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk0OWY3MTVmZjFjYzAwMTdjZWQzZGEiLCJlbWFpbCI6InNvbWVvbmUyQGdtYWlsLmNvbSIsIm5hbWUiOiJTb21lb25lMiIsImlzQWRtaW4iOmZhbHNlLCJleHAiOjE1ODc1NDQ5OTMsImlhdCI6MTU4Njk0MDE5M30.ZcVcDcXXCLDazSTDCIzbLGTc4yn2mMfmGdNl-kSv6T4",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer", // no-referrer, *client
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
//   };

// }
