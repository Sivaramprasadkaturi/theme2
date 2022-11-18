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
import styled from "styled-components";
import classes from "./Styles/Login.module.css";
import {
  MdSchedule,
  MdLocalShipping,
  MdNotifications,
  MdOutlineFavoriteBorder,
  MdRequestPage,
  MdPerson,
  MdAccountCircle,
  MdVisibility,
  MdLockOpen,
  MdOutlineMessage,
  MdContactMail
} from "react-icons/md";
import { setAuthModal } from "../redux/actions/app.js";
import OutsideCloser from "../utils/outside-closer.js";

const Modal = styled.div`
  position: fixed;
  z-index: 1300;
  inset: 0px;
  display: flex;
  align-items: center;
  .bg {
    z-index: -1;
    position: fixed;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  }
  .loginModal {
    width: 400px;
    z-index: 1600;
    background: white;
    margin: auto;
  }
  @media only screen and (max-width: 768px) {
    .loginModal {
      width: 100%;
    }
  }
`;

const LoginBar = () => {
  const loginReducer = useSelector(state => state.loginReducer);
  const { authModal } = useSelector(state => state.appReducer);
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

    if (e.target.email.value.length > 0 && e.target.password.value.length > 0) {
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
          console.info("deneme", res);
        })
        .then(res => res.json())
        .then(json => console.info("TEST FORM", json))

        // It parses the output
        .catch(function (error) {
          console.log("error---", error);
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
              if (json.__Result.loggedin == true) {
                setAlert({
                  text: "you are logged with success",
                  color: "green",
                  show: true
                });
                sessionStorage.setItem(
                  "UserData",
                  JSON.stringify(json.__Result)
                );
                dispatch(updateLoginInfo(json.__Result));
                setloginInfo(json.__Result);
                setisLoading(false);
                setTimeout(() => {
                  dispatch(setAuthModal(false));
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
    } else {
      setAlert({
        text: "Please enter your email address and password",
        color: "red",
        show: true
      });
    }
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
  const fetchJson = async url => {
    const response = await fetch(url, {
      headers: {
        Accept: "*/*"
      }
    });
    return response.json();
  };

  return (
    <div style={{ fontSize: 12 }}>
      <div className="py-3 text-white cursor-pointer">
        {loginReducer.securityToken === "" ? (
          <div
            className="!flex items-center justify-center gap-2 mr-6"
            style={{ display: "flex" }}
            onClick={() => dispatch(setAuthModal(true))}
          >
            {" "}
            <MdPerson style={{ color: "white", fontSize: "1.2rem" }} />
            <p className="text-xs">Login</p>
          </div>
        ) : (
          <div
            className="!flex items-center justify-center gap-2 mr-6"
            style={{ display: "flex" }}
            onClick={() => setWelcomeModel(!welcomeModel)}
          >
            <MdAccountCircle style={{ color: "white", fontSize: "1.5rem" }} />{" "}
            <p className="text-xs">{loginReducer.firstName}</p>
          </div>
        )}{" "}
      </div>

      {authModal && (
        <Modal>
          <div className="bg"></div>
          <div className="loginModal">
            <OutsideCloser
              className="p-5"
              onClose={() => dispatch(setAuthModal(false))}
            >
              <form
                className="!flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
              >
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
                  placeholder="Registered Email"
                  onChange={e =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value
                    })
                  }
                />{" "}
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
                <button className="btn-gray">
                  {isLoading ? (
                    <span className="">
                      <MdSchedule className="transition-all transform animate-spin" />
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
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
                  {/* {translate("ForgotPassword")} */}
                  Forgot Password
                </a>
                <div className={`all_services ${classes.allServices}`}>
                  {" "}
                  {/* {translate("Signupmessage")} */}
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
                    {/* {translate("CreateAccount")} */}
                    Create Account
                  </a>
                </div>
              </div>{" "}
            </OutsideCloser>
          </div>
        </Modal>
      )}

      {welcomeModel && (
        <ul
          wfd-id="380"
          className="absolute z-20 !flex flex-col justify-center bg-white"
          style={{
            right: 300,
            top: 0,
            padding: 25,
            marginTop: 34
          }}
        >
          <div
            className="flex-col gap-4 mobiletab_menu"
            id="welcome-data"
            style={{ display: "flex" }}
            wfd-id="381"
          >
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=customerinfo&vid=${VID}&iu=${"en"}`}
            >
              <MdPerson
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              View Profile
            </a>

            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=vieworder&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdVisibility
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              View Orders
            </a>

            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/wishlist.html?vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdOutlineFavoriteBorder
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Wishlist
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=changepassword&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdLockOpen
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Change Password
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=activities&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdNotifications
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Notifications
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=messages&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdOutlineMessage
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Messages
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=addressbook&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdContactMail
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Address Book
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=billingaddress&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdRequestPage
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Manage Billing Address
            </a>
            <a
              className="items-center justify-start pb-1 text-xs border-b"
              style={{ display: "flex" }}
              href={`${PROJECT_LINK}/myaccount.html?mode=shippingaddress&vid=${VID}&iu=${"en"}`}
            >
              {" "}
              <MdLocalShipping
                className="mr-2"
                style={{ color: "#a1c057", fontSize: "1rem" }}
              />
              Manage Shipping Address
            </a>

            <form
              name="logoutPopup"
              onSubmit={logout}
              id="icici-logout-form"
              autoComplete="on"
            >
              <button
                className="btn-info waves-effect waves-light btn-light-dark"
                type="submit"
                style={{ width: "100%", background: "#777" }}
              >
                {/* {translate("jsp.header_logout")} */}
                LOGOUT
              </button>
            </form>
          </div>
        </ul>
      )}
    </div>
  );
};

export default LoginBar;
