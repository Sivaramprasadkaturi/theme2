import {
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILURE
  } from "../types.js";
  
  import {
    SEND_GOOGLE_TOKEN
  } from "../links.js";
import { VID } from "../../project-config.js";
import { fetchLogin } from "./loginActions.js";
  
  
  export const googleLoginSuccess = () => ({
    type: GOOGLE_LOGIN_SUCCESS
  });

  export const googleLoginFailure = (data) => ({
    type: GOOGLE_LOGIN_FAILURE,
    payload: data
  });
  
  export const sendGoogleToken = (token) => {
  
    return dispatch => {
        var form = new FormData();
        form.append("vid", VID);
        form.append("gtoken", token);
        fetch(SEND_GOOGLE_TOKEN, {
            method: "POST",
            body: form,
            headers: {
                Accept: "*/*",
                credentials: "same-origin"
            },
            mimeType: "multipart/form-data",
            data: form
        })
        .then(res => res.json())
        .then(json => {
            console.error("LOGIN SUCCESS SERVER",json)
          if(json.status){
              dispatch(googleLoginSuccess())
              dispatch(fetchLogin())
          }
        })
        .catch(error => dispatch(googleLoginFailure(error)));
    };
  };
  
  