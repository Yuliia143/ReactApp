
import React from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const getLecture = async (lectureId) => {
  const token = window.localStorage.getItem("Access-Token");
  const result = await axios.get(`${BASE_URL}/api/lectures/${lectureId}`, {
    headers: {
      "Access-Token": token,
    },
    // withCredentials: false,
  });
  return result.data;
};

export const postComment = async(lectureId, comment) => {
  const token = window.localStorage.getItem("Access-Token");

  const myUrl = `${BASE_URL}/api/lectures/${lectureId}/messages`;
  
    // Default options are marked with *
    const response = await axios.post(myUrl, comment, {
      headers: {"Access-Token": token},
    });
    return response.data; 
  };



