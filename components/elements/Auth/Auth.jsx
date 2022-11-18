import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  MdClose,
  MdVpnKey,
  MdOutlineMotionPhotosOn,
  MdVisibility,
  MdNotifications,
  MdStoreMallDirectory,
  MdLocalShipping,
  MdOutlinePowerSettingsNew
} from "react-icons/md";
import { LOGIN_CHECK_LINK, LOGIN_SIGNIN_LINK } from "../../../redux/links";
import {
  handleLogout,
  updateLoginInfo
} from "../../../redux/actions/loginActions";
import { PROJECT_LINK, VID } from "../../../project-config";
import LinearLoading from "../LinearLoading/LinearLoading";
import dynamic from "next/dynamic";
import Translate from "../../../utils/Translate";
const DynamicGoogleSSO = dynamic(() => import("../../GoogleSSO"));

const Auth = ({ authModalState, setAuthModal }) => {
  console.log;
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loginInfo, setloginInfo] = useState();
  const [signinMessage, setSigninMesssage] = useState({ message: "" });

  const [isLoading, setisLoading] = useState(false);

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );

  const [modalOpenedOnce, setModalOpenedOnce] = useState(false);

  useEffect(() => {
    if (authModalState && modalOpenedOnce === false) {
      setModalOpenedOnce(true);
    }
  }, [authModalState]);

  const loadingLogout = useSelector(
    state => state.loginReducer.loading,
    shallowEqual
  );

  const [isLogined, setisLogined] = useState(false);
  useEffect(() => {
    if (securityTokenState) {
      setisLogined(true);
    } else {
      setisLogined(false);
    }
  }, [securityTokenState]);

  const dispatch = useDispatch();

  const languageState = "en";

  useEffect(() => {
    if (signinMessage.message) {
      setTimeout(() => {
        setSigninMesssage({ message: "" });
      }, 4000);
    }
  }, [signinMessage.message]);

  function handleSubmit(event) {
    event.preventDefault();
    setisLoading(true);
    var form = new FormData();
    form.append("doSubmit", "Log In");
    form.append("capchacount", "0");
    form.append("loginInput", event.target.email.value);
    form.append("login", event.target.email.value);
    form.append("password", event.target.password.value);
    form.append("logSubmit", "Log In");

    fetch(LOGIN_SIGNIN_LINK.replace("$LANGUAGE", "en"), {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*"
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(data => {
        console.log("data signin", data);
        setSigninMesssage(data);
        return data;
      })
      .catch(err => {
        console.error("error signing in", err);
      })
      .then(() => {
        fetch(LOGIN_CHECK_LINK, {
          headers: {
            Accept: "*/*"
          }
        })
          .then(res => res.json())
          .then(json => {
            sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
            dispatch(updateLoginInfo(json.__Result));
            setloginInfo(json.__Result);
            setisLoading(false);
          });
      });
  }

  useEffect(() => {
    fetchJson(LOGIN_CHECK_LINK).then(json => {
      if (json.__Result.loggedin == true) {
        sessionStorage.setItem("UserData", JSON.stringify(json.__Result));
        dispatch(updateLoginInfo(json.__Result));
        setloginInfo(json.__Result);
      }
    });
  }, []);

  const logout = () => {
    if (securityTokenState) dispatch(handleLogout(securityTokenState));
  };
  const fetchJson = async url => {
    const response = await fetch(url, {
      headers: {
        Accept: "*/*"
      }
    });
    return response.json();
  };

  const renderErrorMessage = () => {
    const errorMessageMatch =
      signinMessage.error &&
      signinMessage.error.match(/default message \[([^"]+)]/);

    if (errorMessageMatch)
      return errorMessageMatch[0]
        .substring(0, errorMessageMatch[0].length - 1)
        .replace("default message [", "");
    else return signinMessage;
  };

  const renderGoogleSSO = () => {
    if (modalOpenedOnce) {
      return <DynamicGoogleSSO />;
    } else {
      return null;
    }
  };

  return (
    <div className=" bg-white h-full flex flex-col overflow-y-auto w-72 shadow">
      <div className=" relative mx-auto my-0 w-full p-5 flex items-center justify-between font-semibold text-xl bg-black text-white">
        <h2>
          {
            <Translate
              translationFileName="translation"
              translateKey={isLogined ? "js.header.myaccount" : "CustomerLogin"}
            />
          }
        </h2>
        <div
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.target.click();
            }
          }}
          tabIndex={"0"}
          className="focusAbleWhite text-white text-3xl cursor-pointer"
          onClick={() => {
            setAuthModal(false);
          }}
        >
          <MdClose />
        </div>
      </div>

      {!isLogined ? (
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="flex flex-col w-full mt-3 p-5"
        >
          <input
            id="email"
            className="mb-6 outline-none appearance-none border border-gray-300 text-gray-600 px-2 py-3"
            placeholder="Enter your Email"
            type="email"
          />
          <input
            id="password"
            className="mb-6 outline-none appearance-none border border-gray-300 text-gray-600 px-2 py-3"
            placeholder="Enter your Password"
            type="password"
          />
          {signinMessage.message && (
            <div className="error-text" style={{ padding: "10px" }}>
              <p style={{ color: "#ed4337" }}>{renderErrorMessage()}</p>
            </div>
          )}
          <button
            type="submit"
            className=" bg-red-600 text-white py-3 px-2 uppercase text-center flex justify-center items-center"
          >
            {isLoading ? (
              <span className="">
                <MdOutlineMotionPhotosOn className="transition-all transform animate-spin" />
              </span>
            ) : (
              <Translate
                translationFileName={"translation"}
                translateKey={"review.login"}
              />
            )}
          </button>
          <div className="google-login-button">{renderGoogleSSO()}</div>
          <p className="w-full my-3 text-lg font-bold text-center text-montserrat ">
            <Translate
              translationFileName={"translation"}
              translateKey={"text.or"}
            />
          </p>
          <div className="flex flex-col w-full">
            <a
              rel="noreferrer"
              href={PROJECT_LINK + `/register.html?vid=${VID}&mt=1&ml=en`}
              className="bg-black text-white py-3 px-2 uppercase  text-center flex justify-center items-center"
            >
              <Translate
                translationFileName={"translation"}
                translateKey={"login.createaccount"}
              />
            </a>
          </div>

          <a
            rel="noreferrer"
            href={
              PROJECT_LINK + `/forgot_password.html?vid=${VID}&amp;mt=1&ml=en`
            }
            className="w-full mt-6 text-sm font-bold underline cursor-pointer"
          >
            <Translate
              translationFileName={"translation"}
              translateKey={"login.forgotpass"}
            />
          </a>
          <span className="w-full mt-2 font-bold text-xs">
            <Translate
              translationFileName={"translation"}
              translateKey={"Signupmessage"}
            />
          </span>
        </form>
      ) : (
        <ul className="user-profile-dropdown">
          {loadingLogout && <LinearLoading />}
          <a
            href={`${PROJECT_LINK}/myaccount.html?mode=changepassword&vid=${VID}&iu=${languageState}`}
          >
            <li className="myaccount-box">
              <i className="material-icons">
                <MdVpnKey />
              </i>
              <Translate
                translationFileName={"translation"}
                translateKey={"jsp.header_changepassword"}
              />
            </li>
          </a>

          <a
            href={`${PROJECT_LINK}/myaccount.html?mode=vieworder&vid=${VID}&iu=${languageState}`}
          >
            <li className="myaccount-box">
              <i className="material-icons">
                <MdVisibility />
              </i>

              <Translate
                translationFileName={"translation"}
                translateKey={"jsp.header_vieworders"}
              />
            </li>
          </a>
          <a
            href={`${PROJECT_LINK}/myaccount.html?mode=activities&vid=${VID}&iu=${languageState}`}
          >
            <li className="myaccount-box">
              <i className="material-icons">
                <MdNotifications />
              </i>
              <Translate
                translationFileName={"translation"}
                translateKey={"jsp.header_notifications"}
              />
            </li>
          </a>
          <a
            href={`${PROJECT_LINK}/myaccount.html?mode=billingaddress&vid=${VID}&iu=${languageState}`}
          >
            <li className="myaccount-box">
              <i className="material-icons">
                <MdStoreMallDirectory />
              </i>
              <Translate
                translationFileName={"translation"}
                translateKey={"jsp.header_billingaddress"}
              />
            </li>
          </a>
          <a
            href={`${PROJECT_LINK}/myaccount.html?mode=shippingaddress&vid=${VID}&iu=${languageState}`}
          >
            <li className="myaccount-box">
              <i className="material-icons">
                <MdLocalShipping />
              </i>
              <Translate
                translationFileName={"translation"}
                translateKey={"jsp.header_shippingaddress"}
              />
            </li>
          </a>
          <div className="logout-container">
            <a onClick={() => logout()}>
              <li className="myaccount-box">
                <i className="material-icons">
                  <MdOutlinePowerSettingsNew />
                </i>
                <Translate
                  translationFileName={"translation"}
                  translateKey={"jsp.header_logout"}
                />
              </li>
            </a>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Auth;
