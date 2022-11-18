import React, { useEffect, useState, useRef, useContext } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { setHTMLElementFixedPosition } from "../../utils/functions";
// import { sendMessage } from "./EnquiryMessageHandler.js";
// import { I18nContext } from "../../../../../../i18n/index.js";
// import { PREVIEW } from "../../../../../../project-config.js";
// import history from "../../../../../../history.js";
import classes from "./EnquiryModal.module.css";
import {PREVIEW} from "../../preScripts/links";

export default function EnquiryModal({isLoggedIn, enquiryModalState, setEnquiryModalState}) {
    // const { translate, langCode } = useContext(I18nContext);
    const [uploadOptionAvailable, setUploadOptionAvailable] = useState(true);
    const [messageInput, setMessageInput] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    const messageInputEl = useRef();

    const itemCodeState = useSelector(
        state => state.productReducer.itemDetail.code,
        shallowEqual
    );

    useEffect(() => {
        return () => {
            setMessageStatus(""); // Empty it on unmount
        };
    }, []);

    useEffect(() => {
        const TIMEOUT_MESSAGE_STATUS = 3000;
        setMessageInput("");
        setTimeout(() => {
            setMessageStatus("");
        }, TIMEOUT_MESSAGE_STATUS);
    }, [messageStatus]);

    useEffect(() => {
        if (enquiryModalState && isLoggedIn) {
            messageInputEl.current.focus();
        }
        setHTMLElementFixedPosition(enquiryModalState);
        return () => {
            setHTMLElementFixedPosition(false);
        };
    }, [enquiryModalState, isLoggedIn]);

    const handleSendMessageClicked = () => {
        let message = {
            code: itemCodeState,
            subject: `Enquiry about product ${itemCodeState} from xxx`,
            content: messageInput
        };
        // sendMessage(message, setMessageStatus);
    };

    const renderMessageStatus = () => {
        let statusText = "";
        let messageClass = "";
        if (messageStatus.includes("success")) {
            statusText = "Message sent"
            messageClass = classes.messageSendSuccess;
        } else {
            statusText = "Not sent"
            messageClass = classes.messageSendFailure;
        }
        return <p className={messageClass}>{statusText}</p>;
    };

    const renderActions = () => (
        <div className={classes.actions}>
            {/*   {uploadOptionAvailable ? (
        <p
          className={classes.skipFileUploadBtn}
          onClick={event => {
            event.stopPropagation();
            setUploadOptionAvailable(false);
          }}
        >
          {translate(`enquiry.skipFileUpload`)}
        </p>
      ) : (
        <p
          onClick={() => setUploadOptionAvailable(true)}
          className={classes.backToFileUploadBtn}
        >
          {translate(`enquiry.backToFileUpload`)}
        </p>
      )} */}
            {messageStatus == "" ? (
                <button
                    onClick={event => handleSendMessageClicked(event)}
                    className={classes.sendMessageBtn}
                >
                    Send message
                </button>
            ) : (
                renderMessageStatus()
            )}
        </div>
    );

    const handleLoginBtnClicked = () => {
        console.log("login clicked")
    };

    const renderEnquiryModalContent = () => {
        if (isLoggedIn) {
            return (
                <React.Fragment>
                    <div className={classes.title}>
                        <h3>Enquiry about Product ${itemCodeState}</h3>
                        <i
                            onClick={() => setEnquiryModalState(false)}
                            className="material-icons"
                        >
                            close
                        </i>
                    </div>
                    <div className={classes.content}>{renderContent()}</div>
                    <div className={classes.actionsWrapper}>{renderActions()}</div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className={classes.loginTitle}>
                        <h6>Please login</h6>
                        <i
                            onClick={() => setEnquiryModalState(false)}
                            className="material-icons"
                        >
                            close
                        </i>
                    </div>
                    <div className={classes.loginContent}>
                        <small>You need to login to send a message to the seller</small>
                        <div>
                            <button
                                className={classes.loginBtn}
                                onClick={handleLoginBtnClicked}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    };

    const renderContent = () => (
        <React.Fragment>
            <h6 className={classes.contentTitle}>{translate(`enquiry.message`)}:</h6>
            <div className={classes.messageInputWrapper}>
        <textarea
            onChange={event => {
                setMessageInput(event.target.value);
            }}
            value={messageInput}
            ref={messageInputEl}
            className={classes.messageInput}
        ></textarea>
            </div>
            {/*    {uploadOptionAvailable && (
        <input type="file" className={classes.fileInput} />
      )} */}
        </React.Fragment>
    );

    return (
        enquiryModalState && (
            <div
                onClick={event => {
                    event.stopPropagation();
                    setEnquiryModalState(false);
                }}
                className={classes.container}
            >
                <div
                    onClick={event => {
                        event.stopPropagation();
                    }}
                    className={classes.wrapper}
                >
                    {renderEnquiryModalContent()}
                </div>
            </div>
        )
    );
}
