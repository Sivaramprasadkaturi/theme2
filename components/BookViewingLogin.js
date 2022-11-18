import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VID, PREVIEW, PROJECT_LINK } from "../project-config.js";

import { updateLoginInfo } from "../redux/actions/loginActions";
import {
  LOGIN_SIGNIN_LINK,
  LOGIN_CHECK_LINK,
  LOGOUT_LINK
} from "./../redux/links";
import GoogleLogin from "./GoogleSSO";
import classes from "./Styles/Login.module.css";

const LoginBar = ({ comingFrom }) => {
  const loginReducer = useSelector(state => state.loginReducer);
  const [authModal, setAuthModal] = useState(false);
  const [welcomeModel, setWelcomeModel] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [loginInfo, setloginInfo] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    text: "",
    color: "",
    show: false
  });
  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({ text: "", color: "", show: false });
      }, 3000);
    }
  }, [alert.show]);
  const handleSubmit = e => {
    e.preventDefault();
    setisLoading(true);

    fetch(LOGIN_SIGNIN_LINK.replace("$LANGUAGE", "en"), {
      method: "POST",
      body: `doSubmit=Log+In&capchacount=0&login=${encodeURIComponent(
        event.target.email.value
      )}&password=${escape(event.target.password.value)}&logSubmit=Log+In`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        console.info(res);
      })
      .then(res => res.json())
      .then(json => console.info("TEST FORM", json))

      // It parses the output
      .catch(function (error) {
        setisLoading(false);
      })
      .then(() => {
        fetch(LOGIN_CHECK_LINK, {
          headers: {
            Accept: "*/*"
          }
        })
          .then(res => res.json())
          .then(json => {
            if (json.__Success === "true") {
              setAlert({
                text: "you are logged with success",
                color: "green",
                show: true
              });
              sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
              dispatch(updateLoginInfo(json.__Result));
              setloginInfo(json.__Result);
              setisLoading(false);
              setTimeout(() => {
                setAuthModal(false);
              }, 3000);
            } else {
              setAlert({
                text: "your email or password is incorrect",
                color: "red",
                show: true
              });
              setisLoading(false);
            }

            // console.info("comingFrom", comingFrom);
            // if (comingFrom && comingFrom.comp == "BookViewingModal")
            //   dispatch(reFetchProductInitialState("", comingFrom.itemid, true));
          });
      });
  };

  useEffect(() => {
    fetchJson(LOGIN_CHECK_LINK).then(json => {
      if (json.__Result.loggedin == true) {
        sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
        dispatch(updateLoginInfo(json.__Result));
        setloginInfo(json.__Result);
      }
    });
  }, [dispatch]);

  function logout(event) {
    event.preventDefault();
    setisLoading(true);
    var form = new FormData();
    form.append("securitytoken", loginReducer.securityToken);

    fetch(LOGOUT_LINK, {
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
      .then(json => console.log("TEST FORM", json))

      // It parses the output
      .catch(function (error) {
        console.log("error---", error);
      })
      .then(() => {
        fetchJson(LOGIN_CHECK_LINK).then(json => {
          sessionStorage.setItem("UserData", JSON.stringify(json.__Result));

          setloginInfo(json.__Result);
          dispatch(updateLoginInfo(json.__Result));

          setWelcomeModel(false);
        });
      })
      .then(() => {
        setisLoading(false);
      });
  }

  useEffect(() => {
    if (loginInfo != undefined) {
      if (loginInfo.loggedin == true) {
        setIsLogined(true);
      } else {
        setIsLogined(false);
      }
    }
  }, [loginInfo]);

  const fetchJson = async url => {
    const response = await fetch(url, {
      headers: {
        Accept: "*/*"
      }
    });
    return response.json();
  };

  if (!isLogined) {
    return (
      <React.Fragment>
        <div className={classes.loginWrapper} id="loginModalBox">
          {/* <h2 style={{ fontSize: "1em" }}>{translate("CustomerLogin")}</h2> */}

          <form
            className={classes.loginModal}
            name="loginPopup"
            onSubmit={handleSubmit}
            id="icici-login-form"
            autoComplete="on"
          >
            <div
              className="error-text"
              id="login_error"
              style={{ display: "block" }}
            />
            <div>
              <div
                className={`col l12 m12 s12 ${classes.loginModalInputContainer}`}
              >
                <div>
                  <input
                    style={{
                      color: "#333",
                      height: 42,
                      marginBottom: 20,
                      textIndent: "1rem",
                      fontSize: 13
                    }}
                    className="w-full border outline-none appearance-none"
                    type="email"
                    name="email"
                    placeholder="Registered Email/UserId"
                    onChange={e =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }
                  />{" "}
                </div>
              </div>
            </div>

            <div
              className={`col l12 m12 s12 ${classes.loginModalInputContainer}`}
            >
              <div>
                <input
                  style={{
                    color: "#333",
                    height: 42,
                    marginBottom: 20,
                    textIndent: "1rem",
                    fontSize: 13
                  }}
                  className="w-full border outline-none appearance-none"
                  type="password"
                  placeholder="Enter Your Password"
                  autoComplete="on"
                  name="password"
                  onChange={e =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value
                    })
                  }
                />
                {alert.show && (
                  <p
                    className={` text-${alert.color}-600 text-center w-full mb-3 font-semibold`}
                  >
                    {alert.text}
                  </p>
                )}{" "}
              </div>
            </div>

            <div className="clearfix " />

            <div className="loginModalButtons">
              <button type="submit" className={classes.button}>
                Login
              </button>
              <span style={{ display: "block", margin: "20px 0" }}>
                Or sign in with
              </span>
              <div>
                <GoogleLogin />
              </div>
              <div className="data-login">
                <a
                  className={`services-right ${classes.forgotPasswordLink}`}
                  href={`${PREVIEW}/forgot_password.html?vid=${VID}&amp;mt=1&ml=${"en"}`}
                >
                  Forgot Password
                </a>
                <div className={`all_services ${classes.allServices}`}>
                  {" "}
                  Sign up now to know more about our services!
                </div>
                <div
                  className="login_registerbtn"
                  style={{ margin: "10px 0px" }}
                >
                  <a
                    href={`${PREVIEW}/register.html?vid=${VID}&mt=1&ml=${"en"}`}
                    className={classes.button}
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
};

export default LoginBar;
