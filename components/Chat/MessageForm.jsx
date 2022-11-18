import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { configQuoteRequest } from "../../store-config";
import { removeDefaultMessage } from "../../redux/actions/chatActions";

import Box from "../AC-UI-Elements/Box/Box";

const validationSchema = Yup.object().shape({
  message: Yup.string().trim().required("Required")
});

const MessageForm = ({
  showChatQuoteBasket,
  sendMessage,
  currentConversation,
  setCount,
  scrollToBottom,
  countShowConfirmForQuoteBasket,
  setStartCountdown,
  setShowConfirmForQuoteBasket,
  login,
  inputFIeldRef,
  setCurrentConversation,
  currentChat,
  classes,
  usingScrollToBottom
}) => {
  const defaultMessage = useSelector(
    state => state.chatReducer.defaultMessage,
    shallowEqual
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: defaultMessage || ""
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (showChatQuoteBasket) {
        sendMessage({
          variables: {
            chatId: currentConversation.id,
            content: values.message,
            senderId: currentConversation.chat_users.find(
              us => us.user.email === login.loginName
            ).user.id
          }
        })
          .then(() => {
            resetForm();
            setCount(2);
            dispatch(removeDefaultMessage());

            if (usingScrollToBottom) scrollToBottom();

            if (configQuoteRequest === "CHAT") {
              if (countShowConfirmForQuoteBasket === 1) {
                setStartCountdown(true);
                setShowConfirmForQuoteBasket(true);
              }
            }
          })
          .catch(() => console.log("Error"));
      } else {
        sendMessage({
          variables: {
            chatId: currentConversation.id,
            content: values.message,
            senderId: currentConversation.chat_users.find(
              us => us.user.email === login.loginName
            ).user.id,
            quote_request_id: localStorage.getItem("quote_request_id") || null
          }
        })
          .then(() => {
            setCount(2);
            if (usingScrollToBottom) scrollToBottom();

            setCurrentConversation(currentChat);
            resetForm();
            dispatch(removeDefaultMessage());
          })
          .catch(() => console.log("Error"));
      }
    }
  });

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        customStyle={{
          display: "flex",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <textarea
          ref={inputFIeldRef}
          autoFocus
          value={formik.values.message}
          onChange={formik.handleChange}
          onKeyDown={event => {
            if (event.code === "Enter" || event.code === "NumpadEnter")
              formik.handleSubmit();
          }}
          name="message"
          placeholder={
            isMobileState ? "Type here..." : "Type your message here..."
          }
          maxRows={4}
          className={classes.chatInput}
        />
        <button
          style={{
            height: "max-content",
            background: "#FFFFFF",
            border: "3px solid #006112",
            borderRadius: 30,
            padding: "12px 26px"
          }}
          type="submit"
        >
          SEND
        </button>
      </Box>
    </form>
  );
};

export default MessageForm;
