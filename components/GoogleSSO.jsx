import React from "react";
import { useDispatch } from "react-redux";

import { sendGoogleToken } from "../redux/actions/googleLoginActions";
import GoogleLogin from "react-google-login";
import classes from "./Styles/GoogleSSO.module.css";

const GoogleSSO = () => {
  const dispatch = useDispatch();
  const responseGoogle = response => {
    // "if success"
    if (Object.keys(response).some(res => res === "tokenId")) {
      dispatch(sendGoogleToken(response.tokenId));
      // 1 - Dispatch an action to do the POST to ssoautologin.ajx
      // 2 - Parameters are vid and id_token
      // let id_token = googleUser.getAuthResponse().id_token
      // 3 - on success, update UI and states to have user signed in
      // We get status data back
    } else {
      console.log("Issues with google sign on");
    }
  };

  return (
    <GoogleLogin
      className={classes.googleSSO}
      clientId="848203255704-kuchosdbfi2608v2sr9hpc45v210q80l.apps.googleusercontent.com"
      buttonText="Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSSO;
