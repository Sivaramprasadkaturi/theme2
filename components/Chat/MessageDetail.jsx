import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MESSAGES_BY_QUOTE_REQUEST, GET_RECEIVER_ID } from "./queries";
import { configQuoteRequest, configSupplierChat } from "../../store-config";
import moment from "moment";
import { MdCancel, MdPerson } from "react-icons/md";
import dayjs from "dayjs";
import MessageForm from "./MessageForm";
import Grid from "../AC-UI-Elements/Grid/Grid";
import TypoGraphy from "../AC-UI-Elements/TypoGraphy/TypoGraphy";
import IconButton from "../AC-UI-Elements/IconButton/IconButton";
import Box from "../AC-UI-Elements/Box/Box";
import * as classes from "./Styles/MessageDetail.module.css";
let countdownTimeout;
const pathname = typeof window !== "undefined" && window.location.pathname;

const MessageDetail = ({
  currentChat,
  currentConversation,
  handleCloseModal,
  sendMessage,
  mobileView,
  setCurrentConversation,
  inputFIeldRef,
  supplierInfo,
  count,
  setCount,
  chatSubscription,
  statusMarketplaceSupport,
  messageBoxMutation,
  currentQuoteBasket,
  usingMarketplaceSupport,
  usingScrollToBottom
}) => {
  const messageDetailEndRef = useRef();
  const messageDetailRef = useRef();

  const { activeDist, chatWithVendor, quoteRequestId } = useSelector(
    state => state.chatReducer,
    shallowEqual
  );

  const [getMessagesByQuoteRequest] = useLazyQuery(
    GET_MESSAGES_BY_QUOTE_REQUEST
  );
  const { loading } = useQuery(GET_RECEIVER_ID, {
    variables: {
      vendorId: activeDist?.vendorId
    },
    skip: typeof activeDist?.vendorId === "undefined"
  });

  const [countShowConfirmForQuoteBasket, setCountShowConfirmForQuoteBasket] =
    useState(1);
  const [showConfirmForQuoteBasket, setShowConfirmForQuoteBasket] =
    useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [displayAllMessages, setDisplayAllMessages] = useState(false);
  const [
    currentConversationWithMessagesByQuoteRequestId,
    setCurrentConversationWithMessagesByQuoteRequestId
  ] = useState({});

  const showChatQuoteBasket = useSelector(
    state => state.chatReducer.showChatQuoteBasket,
    shallowEqual
  );

  const login = useSelector(state => state.loginReducer, shallowEqual);

  const scrollToBottom = () =>
    messageDetailEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });

  const handleViewLastMessage = () =>
    messageDetailRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

  useEffect(() => {
    if (usingScrollToBottom) {
      scrollToBottom();
    }
  }, [currentConversation]);

  useEffect(() => {
    if (startCountdown && countShowConfirmForQuoteBasket === 1) {
      messageBoxMutation({
        variables: {
          chatId: currentChat?.id,
          senderId: supplierInfo?.id,
          content: "Please wait while we connect to the supplier....",
          quote_request_id: currentQuoteBasket?.id + ""
        }
      }).then(() => {
        setCountShowConfirmForQuoteBasket(0);
      });
    }

    if (startCountdown && countShowConfirmForQuoteBasket === 0) {
      countdownTimeout = setTimeout(() => {
        const messageListSupplier = currentConversation.messages.filter(
          message => message.user.email !== login.loginName
        );
        const supplierInfo = currentChat?.chat_users?.find(
          item => item.user.email !== login.loginName
        ).user;

        const differentSeconds = moment(new Date()).diff(
          moment(
            messageListSupplier[messageListSupplier.length - 1].created_at
          ),
          "seconds"
        );

        if (differentSeconds > 10) {
          messageBoxMutation({
            variables: {
              chatId: currentChat?.id,
              senderId: supplierInfo?.id,
              content:
                "Unfortunately the supplier is unable to respond at this moment and you will be notified as soon as possible.",
              quote_request_id: currentQuoteBasket?.id + ""
            }
          }).then(() => {
            setCurrentConversation(currentChat);
          });
        }

        setStartCountdown(false);
        clearTimeout(countdownTimeout);
      }, 10000);
    }

    return () => {
      if (countdownTimeout) {
        clearTimeout(countdownTimeout);
      }
    };
  }, [currentConversation, startCountdown]);

  const chatWindowTitle = brandName => {
    return (
      <TypoGraphy style={{ fontWeight: 600, marginBottom: 10 }}>
        Connecting with {brandName}
      </TypoGraphy>
    );
  };

  const isTheSameUser = (userEmailFromChat, currentUserEmail) => {
    return userEmailFromChat === currentUserEmail;
  };

  const handleSwitchChange = async e => {
    setDisplayAllMessages(e.target.checked);
    if (e.target.checked) {
      // const data = await getMessagesByQuoteRequest({
      //   variables: {
      //     quoteRequestId: quoteRequestId
      //   }
      // });
      // setCurrentConversationWithMessagesByQuoteRequestId({
      //   ...currentConversation,
      //   messages: [...data.message]
      // });
    } else {
      setCurrentConversation(currentConversation);
    }
  };
  const selectMessages = (currentConversationLocal, currentVendorLocal) => {
    const supplierVid = currentConversationLocal?.chat_users.find(
      us => us.user?.vendor?.supplier_vendorId
    ).user.vendor.supplier_vendorId;
    if (currentVendorLocal === supplierVid) {
      return null;
      // <Grid item>
      //   <FormControl component="fieldset">
      //     <FormGroup aria-label="position" row>
      //       <FormControlLabel
      //         value="start"
      //         control={
      //           <Switch
      //             color="primary"
      //             checked={displayAllMessages}
      //             onChange={handleSwitchChange}
      //           />
      //         }
      //         // label={`Show messages for ${quoteRequestId}`}
      //         // labelPlacement="start"
      //       />
      //     </FormGroup>
      //   </FormControl>
      // </Grid>
    }
  };

  const selectTheSourceOfMessages = (
    currentConversationLocal,
    quoteRequestId,
    currentVendorLocal
  ) => {
    // console.log("kril", currentVendorLocal, chatWithVendor);
    const supplierVid = currentConversationLocal?.chat_users.find(
      us => us.user?.vendor?.supplier_vendorId
    ).user.vendor.supplier_vendorId;
    if (
      chatWithVendor === supplierVid &&
      quoteRequestId &&
      displayAllMessages
    ) {
      console.log("ajidfs - 1");
      return currentConversationWithMessagesByQuoteRequestId;
    } else {
      console.log(
        "ajidfs - 2",
        currentVendorLocal,
        supplierVid,
        quoteRequestId
      );
      return currentConversationLocal;
    }
  };
  return (
    <>
      {mobileView ? (
        <Box customClassName={classes.chatHeaderMobile}>
          {showChatQuoteBasket && count !== 3
            ? loading && (
                <TypoGraphy style={{ fontWeight: 600, marginBottom: 10 }}>
                  Connecting with {supplierInfo.vendor.brand}
                </TypoGraphy>
              )
            : ""}

          <IconButton
            tempStyle={{ padding: 0, paddingBottom: 12 }}
            onClick={handleCloseModal}
          >
            <MdCancel style={{ width: "24px", height: "24px" }} />
          </IconButton>
        </Box>
      ) : !activeDist?.vendorId && statusMarketplaceSupport ? (
        <TypoGraphy style={{ fontWeight: 600, marginBottom: 5 }}>
          Please type any message below if you need from help Marketplace
          Support
        </TypoGraphy>
      ) : (
          showConfirmForQuoteBasket && configQuoteRequest === "CHAT"
            ? null
            : showChatQuoteBasket && configQuoteRequest === "CHAT"
        ) ? (
        <>{chatWindowTitle(supplierInfo?.vendor?.brand)}</>
      ) : configQuoteRequest === "MESSAGE" && usingMarketplaceSupport ? (
        <Grid
          container="true"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item="true">
            {chatWindowTitle(
              currentConversation?.chat_users?.find(
                us => us.user.email !== login.loginName
              )?.user?.vendor?.brand ||
                currentConversation?.chat_users?.find(
                  us => us.user.email !== login.loginName
                )?.user?.firstName
            )}
          </Grid>
          {selectMessages(currentConversation, chatWithVendor)}
        </Grid>
      ) : configSupplierChat === "ON" &&
        chatSubscription?.chat?.length > 0 &&
        Object.keys(currentConversation || {}).length > 0 &&
        pathname !== "/" &&
        usingMarketplaceSupport ? (
        <TypoGraphy style={{ fontWeight: 600, marginBottom: 5 }}>
          Please type any message below to
          {" " +
            currentConversation?.chat_users?.find(
              us => us.user.email !== login.loginName
            )?.user?.vendor?.brand}
        </TypoGraphy>
      ) : (
        Object.keys(currentConversation || {}).length > 0 && (
          <Box
            customStyle={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <button
              style={{
                borderRadius: 18
              }}
              className={classes.buttonViewMessageLabel}
              onClick={handleViewLastMessage}
            >
              View past messages
            </button>
          </Box>
        )
      )}

      <Box customClassName={classes.chatWrapperMessageDetail}>
        <div className={classes.messageContainer}>
          <div ref={messageDetailRef} />
          {selectTheSourceOfMessages(
            currentConversation,
            chatWithVendor
          )?.messages?.map(message => {
            const cssClassForBox = () => {
              if (!message?.user?.email) {
                return null;
              } else if (isTheSameUser(message?.user.email, login.loginName)) {
                return classes.chatOwnerContainer;
              } else {
                return classes.chatOtherContainer;
              }
            };

            return (
              <Box
                key={message.id}
                customStyle={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row-reverse"
                }}
                customClassName={cssClassForBox()}
              >
                <div
                  key={message.id}
                  className={
                    isTheSameUser(message?.user.email, login.loginName)
                      ? classes.chatOwnerAvatar
                      : classes.listItemAvatar
                  }
                >
                  <div
                    className={classes.avatarDetail}
                    style={{
                      borderColor: isTheSameUser(
                        message?.user.email,
                        login.loginName
                      )
                        ? "#006112"
                        : "#4A4A4A"
                    }}
                  >
                    <MdPerson />
                  </div>
                </div>
                <div className={classes.textChatContainer}>
                  <div
                    key={message.id}
                    className={
                      isTheSameUser(message?.user.email, login.loginName)
                        ? classes.listItemTextOwner
                        : classes.listItemTextSupplier
                    }
                    style={{ margin: 0, flex: 0 }}
                  >
                    <span className={classes.ListItemTextPrimary}>
                      {isTheSameUser(message?.user.email, login.loginName)
                        ? login.firstName
                        : message?.user?.vendor?.brand}
                    </span>
                    <p className={classes.ListItemTextSecondary}>
                      {`${dayjs(message.created_at).format("HH:mm")} | ${dayjs(
                        message.created_at
                      ).format("dddd MM.DD.YY")}`}
                    </p>
                  </div>
                  <Box
                    customClassName={
                      isTheSameUser(message?.user.email, login.loginName)
                        ? classes.messageContentOwner
                        : classes.messageContentSupplier
                    }
                    title={message.content}
                  >
                    {message.content}
                  </Box>
                </div>
              </Box>
            );
          })}
          <div ref={messageDetailEndRef} />
        </div>

        {Object.keys(currentConversation || {}).length > 0 && (
          <MessageForm
            showChatQuoteBasket={showChatQuoteBasket}
            sendMessage={sendMessage}
            currentConversation={currentConversation}
            setCount={setCount}
            scrollToBottom={scrollToBottom}
            usingScrollToBottom={usingScrollToBottom}
            countShowConfirmForQuoteBasket={countShowConfirmForQuoteBasket}
            setStartCountdown={setStartCountdown}
            setShowConfirmForQuoteBasket={setShowConfirmForQuoteBasket}
            login={login}
            inputFIeldRef={inputFIeldRef}
            setCurrentConversation={setCurrentConversation}
            currentChat={currentChat}
            classes={classes}
          />
        )}
      </Box>
    </>
  );
};

export default MessageDetail;
