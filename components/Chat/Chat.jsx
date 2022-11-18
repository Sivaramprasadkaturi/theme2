import React, { useEffect, useRef, useState } from "react";
import TypoGraphy from "../AC-UI-Elements/TypoGraphy/TypoGraphy";
import IconButton from "../AC-UI-Elements/IconButton/IconButton";
import Grid from "../AC-UI-Elements/Grid/Grid";
import Modal from "../AC-UI-Elements/Modal/Modal";
import { MdCancel } from "react-icons/md";
import Box from "../AC-UI-Elements/Box/Box";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  hideChatPopup,
  hideChatQuoteBasket
} from "../../redux/actions/chatActions";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_CHAT_SUBSCRIPTION, GET_USER_ONLINE } from "./queries";
import { SEND_MESSAGE } from "./mutations";
import { trimString } from "../../utils/functions";
import {
  configQuoteRequest,
  configSupportChat,
  configSupplierChat
} from "../../store-config";
import tweet from "../../public/sounds/tweet.mp3";
import MessageDetail from "./MessageDetail";
import moment from "moment";
import LinearLoading from "../elements/LinearLoading/LinearLoading";
import {
  NOTIFICATION_TOPICS,
  useSubscribeToPushNotifications
} from "../hooks/useSubscribeToPushNotifications";
import { VID } from "../../project-config";
import classes from "./Styles/Chat.module.css";

import useWindowSize from "../../utils/UseWindowSize";
const sound = typeof window !== "undefined" && new Audio(tweet);
const pathname = typeof window !== "undefined" && window.location.pathname;

const CHAT_NEW_MESSAGE_TOPIC = "NEW_CHAT_MESSAGE_EVENT";
const Chat = ({
  params,
  showChatPopup,
  usingChatPopup = true,
  usingBorderRadius = true,
  usingMarketplaceSupport = true,
  style,
  usingScrollToBottom = true
}) => {
  const size = useWindowSize();
  const supplierBasket = useSelector(
    state =>
      state.sessionReducer.suppliersBasket[
        params && typeof params.vid !== "undefined"
          ? params.vid
          : state.sessionReducer.selectedBasket
      ],
    shallowEqual
  );
  const showChatQuoteBasket = useSelector(
    state => state.chatReducer.showChatQuoteBasket,
    shallowEqual
  );
  const chatStore = useSelector(state => state.chatReducer, shallowEqual);
  const login = useSelector(state => state.loginReducer, shallowEqual);

  const [isSubscribed, subscribeOrUnsubscribe] =
    useSubscribeToPushNotifications({
      defaultVendorId: VID,
      defaultNotificationTopic: NOTIFICATION_TOPICS.NEW_CHAT_MESSAGE_EVENT
    });

  const activeDist = useSelector(
    state => state.chatReducer.activeDist,
    shallowEqual
  );

  const currentQuoteBasket = supplierBasket?.quoteproducts?.filter(
    item => item.distName === activeDist
  )?.[0];

  const [count, setCount] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [statusMarketplaceSupport, setStatusMarketplaceSupport] =
    useState(false);
  const [currentChatId, setCurrentChatId] = useState();
  const [supportAgentChat, setSupportAgentChat] = useState([]);
  const [currentConversation, setCurrentConversation] = useState();
  const [reRangeChatSubscription, setReRangeChatSubscription] =
    useState(chatSubscription);

  const { data: userOnlineSubscription } = useSubscription(GET_USER_ONLINE);
  const { data: chatSubscription, loading } = useSubscription(
    GET_CHAT_SUBSCRIPTION
  );

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const inputFIeldRef = useRef();

  useEffect(() => {
    if (
      chatSubscription &&
      chatSubscription.chat &&
      currentConversation &&
      currentConversation.id
    ) {
      console.log("setCurrentConversation - 1");
      setCurrentConversation(
        chatSubscription.chat.find(el => el.id === currentConversation.id)
      );
    }

    setReRangeChatSubscription(chatSubscription);
  }, [chatSubscription]);

  const currentChat = chatSubscription?.chat?.find(el => {
    return chatStore?.chatWithVendor
      ? el.chat_users
          .filter(user => user.user.vendor !== null)
          .find(user => user.user.vendor.supplier_vendorId)?.user?.vendor
          ?.supplier_vendorId === chatStore?.chatWithVendor
      : el.id === currentChatId;
  });
  const supplierInfo = currentChat?.chat_users?.find(
    item => item.user.email !== login.loginName
  )?.user;

  useEffect(() => {
    if (chatStore.chatWithVendor) {
      if (count === 1 && showChatQuoteBasket && configQuoteRequest !== "NONE") {
        // setCurrentConversation(currentChat1)
        // sendMessage({
        //   variables: {
        //     chatId: currentChat?.id,
        //     senderId: supplierInfo?.id,
        //     content: `You have requested a quote for: ${
        //       currentQuoteBasket?.qty
        //     } ${currentQuoteBasket?.title} ${formatter.format(
        //       currentQuoteBasket?.price / priceConvert
        //     )} each`,
        //     quote_request_id: currentQuoteBasket?.id + ""
        //   }
        // }).then(() => {
        //   sendMessage({
        //     variables: {
        //       chatId: currentChat?.id,
        //       senderId: supplierInfo?.id,
        //       content: `While we wait to connect to ${supplierInfo?.vendor?.brand}  can you advise if you have any Additional Requirments for this quote request?`,
        //       quote_request_id: currentQuoteBasket?.id + ""
        //     }
        //   }).then(() => {
        //     const tempReRangeChatSubscription = chatSubscription?.chat
        //       ?.map(item => ({
        //         ...item,
        //         timestamp:
        //           item?.messages?.[item?.messages?.length - 1]?.created_at
        //       }))
        //       ?.sort((x, y) => moment(y?.timestamp).diff(x?.timestamp));
        //
        //     setCount(2);
        //     setCurrentConversation(currentChat);
        //     handleFocusInputField();
        //     setStatusMarketplaceSupport(false);
        //     setReRangeChatSubscription({
        //       ...reRangeChatSubscription,
        //       chat: tempReRangeChatSubscription
        //     });
        //     if (size.width <= 958) setShowChatPopupDetail(true);
        //   });
        // });
      } else {
        const tempReRangeChatSubscription = chatSubscription?.chat
          ?.map(item => ({
            ...item,
            timestamp: item?.messages?.[item?.messages?.length - 1]?.created_at
          }))
          ?.sort((x, y) => moment(y?.timestamp).diff(x?.timestamp));

        setCurrentConversation(currentChat);
        setReRangeChatSubscription({
          ...reRangeChatSubscription,
          chat: tempReRangeChatSubscription
        });
      }
    }
  }, [
    chatStore.chatWithVendor,
    showChatPopup,
    chatSubscription,
    showChatQuoteBasket
  ]);

  useEffect(() => {
    if (
      (!chatStore?.chatWithVendor &&
        showChatPopup &&
        !currentChatId &&
        configSupplierChat === "ON" &&
        chatSubscription?.chat?.length > 0,
      supportAgentChat?.length > 0)
    ) {
      console.log("setCurrentConversation - 4");
      setCurrentConversation(supportAgentChat?.[0]);
      setStatusMarketplaceSupport(true);
      dispatch(hideChatQuoteBasket());
      handleFocusInputField();
      if (size.width <= 958) setShowChatPopupDetail(true);
    }
  }, [
    showChatPopup,
    configSupplierChat,
    chatSubscription,
    pathname,
    currentChatId,
    supportAgentChat
  ]);

  const dispatch = useDispatch();

  const [showChatPopupDetail, setShowChatPopupDetail] = useState(false);

  const handleCloseModal = () => {
    setCurrentConversation(undefined);
    dispatch(hideChatPopup());
  };

  const handleCloseModalChatDetail = () => setShowChatPopupDetail(false);

  const handleFocusInputField = () => inputFIeldRef?.current?.focus();

  const userForCaseWelcomeMessage =
    chatSubscription?.chat?.[0]?.chat_users?.find(
      us => us.user.email !== login.loginName
    )?.user;

  useEffect(() => {
    if (
      userOnlineSubscription !== undefined &&
      !userOnlineSubscription?.user_online
        ?.map(userOnline => userOnline?.email)
        ?.includes(login?.loginName) &&
      showChatQuoteBasket &&
      configQuoteRequest === "CHAT"
    ) {
      sendMessage({
        variables: {
          chatId: currentChat?.id,
          senderId: supplierInfo?.id,
          content:
            "Unfortunately the Supplier is not able to connect at this moment.   You will be notified of his response via email or via the notifcations alert at the top of the page.  Feel free to add more messages here as that supplier will receive them all.",
          quote_request_id: currentQuoteBasket?.id + ""
        }
      });
    }
  }, []);

  useEffect(() => {
    if (reRangeChatSubscription || chatSubscription) {
      const tempReRangeChatSubscription = chatSubscription?.chat
        ?.map(item => ({
          ...item,
          timestamp: item?.messages?.[item?.messages?.length - 1]?.created_at
        }))
        ?.sort((x, y) => moment(y?.timestamp).diff(moment(x?.timestamp)));

      const currentChat1 = chatSubscription?.chat?.find(el => {
        return chatStore?.chatWithVendor
          ? el.chat_users
              .filter(user => user.user.vendor !== null)
              .find(user => user.user.vendor.supplier_vendorId)?.user?.vendor
              ?.supplier_vendorId === chatStore?.chatWithVendor
          : el.id === currentChatId;
      });

      if (
        tempReRangeChatSubscription &&
        tempReRangeChatSubscription.length > 0
      ) {
        setCurrentChatId(tempReRangeChatSubscription[0]?.id);
        setCurrentConversation(currentChat1);
      }

      setReRangeChatSubscription({
        ...reRangeChatSubscription,
        chat: tempReRangeChatSubscription
      });
    }
  }, [chatSubscription]);

  useEffect(() => {
    if (reRangeChatSubscription) {
      if (usingMarketplaceSupport)
        setSupportAgentChat(
          reRangeChatSubscription?.chat?.filter(chat => {
            if (chat?.chat_users?.find(user => user?.user?.isSupportAgent))
              return true;
          })
        );
      else setCurrentConversation({});
    }
  }, []);

  return (
    <>
      <Box
        customClassName={classes.chatPopupWrapper}
        customStyle={{
          position: usingChatPopup ? "absolute" : "relative",
          width: usingChatPopup ? "90vw" : "100%",
          borderRadius: usingBorderRadius ? "20px" : 0,
          ...style
        }}
      >
        {loading || chatSubscription === undefined ? (
          <Box
            customStyle={{
              height: "78vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LinearLoading />
          </Box>
        ) : chatSubscription?.chat?.length === 0 ? (
          <Box customStyle={{ marginLeft: 15, marginTop: 15 }}>
            <TypoGraphy variant="h4" style={{ fontWeight: 700 }}>
              You don&apos;t have any messages from any supplier
              <Box customClassName={classes.chatHeader}>
                <IconButton
                  tempStyle={{ padding: 0, paddingBottom: 12 }}
                  onClick={handleCloseModal}
                >
                  <MdCancel />
                </IconButton>
              </Box>
            </TypoGraphy>
          </Box>
        ) : (
          <>
            {usingChatPopup && (
              <Box customClassName={classes.chatHeader}>
                <IconButton
                  tempStyle={{ padding: 0, paddingBottom: 12 }}
                  onClick={handleCloseModal}
                >
                  <MdCancel />
                </IconButton>
              </Box>
            )}
            <Grid container="true" className={classes.chatPopupContainer}>
              <Grid
                key="1"
                item={"true"}
                xs={12}
                lg={3}
                xl={3}
                md={3}
                tempStyle={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
              >
                <div className={classes.chatContainerLeft}>
                  {configSupportChat === "ON" && usingMarketplaceSupport && (
                    <>
                      <TypoGraphy className={classes.listSubHeader}>
                        Marketplace Support
                      </TypoGraphy>
                      <Box customClassName={classes.chatListContainerLeft}>
                        {supportAgentChat?.map(el => (
                          <div
                            className={classes.listItem}
                            style={
                              currentConversation?.id === el?.id
                                ? {
                                    background: "rgba(0, 0, 0, 0.04)"
                                  }
                                : {}
                            }
                            key="0"
                            onClick={() => {
                              setCurrentChatId(el.id);
                              setCurrentConversation(el);
                              dispatch(hideChatQuoteBasket());
                              handleFocusInputField();
                              if (size.width <= 958)
                                setShowChatPopupDetail(true);
                            }}
                          >
                            <div className={classes.listItemAvatar}>
                              <div className={classes.badge}>
                                <div
                                  className={classes.avatar}
                                  style={{
                                    color: "#AAAAAA"
                                  }}
                                >
                                  M
                                </div>
                                <span
                                  className={
                                    classes.badgeAvatar + " " + classes.dot
                                  }
                                />
                              </div>
                            </div>
                            <div className={classes.mainListItem}>
                              <span className={classes.listItemText}>
                                {`${
                                  el.chat_users?.find(
                                    item => item.user.isSupportAgent
                                  )?.user?.firstName
                                } ${
                                  el.chat_users?.find(
                                    item => item.user.isSupportAgent
                                  )?.user?.lastName
                                }`}
                              </span>
                              <p className={classes.listItemTextP}>
                                {trimString(
                                  "Can we help you find the product you are looking for?",
                                  15
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </Box>

                      <div className={classes.divider} />
                    </>
                  )}

                  {configSupplierChat === "ON" &&
                    reRangeChatSubscription?.chat?.length > 0 && (
                      <>
                        <TypoGraphy className={classes.listSubHeader}>
                          Suppliers
                        </TypoGraphy>
                        <Grid item="true">
                          <fieldset className={classes.formControl}>
                            <div className={classes.formGroup}>
                              <span className={classes.switchLabel}>
                                Get notified of new messages
                              </span>

                              <label className={classes.switchButton}>
                                <input
                                  type="checkbox"
                                  name="notification"
                                  color="primary"
                                  checked={isSubscribed}
                                  onChange={() => subscribeOrUnsubscribe()}
                                />
                                <span
                                  className={
                                    classes.slider + " " + classes.round
                                  }
                                ></span>
                              </label>
                            </div>
                          </fieldset>
                        </Grid>
                        <Box customClassName={classes.chatListContainerLeft}>
                          {reRangeChatSubscription?.chat
                            ?.filter(chat => {
                              if (
                                !chat.chat_users.find(
                                  user => user?.user?.isSupportAgent
                                )
                              )
                                return true;
                            })
                            ?.map((el, i) => {
                              const user = el.chat_users.find(
                                us => us.user.email !== login.loginName
                              )?.user;

                              return (
                                <React.Fragment key={el.id}>
                                  <div
                                    className={classes.listItem}
                                    style={
                                      currentConversation?.id === el?.id
                                        ? {
                                            background: "rgba(0, 0, 0, 0.04)"
                                          }
                                        : {}
                                    }
                                    onClick={() => {
                                      setCurrentChatId(el.id);
                                      setCurrentConversation(el);
                                      // dispatch(hideChatQuoteBasket());
                                      handleFocusInputField();
                                      setStatusMarketplaceSupport(false);

                                      if (size.width <= 958)
                                        setShowChatPopupDetail(true);
                                    }}
                                  >
                                    <div className={classes.listItemAvatar}>
                                      <div className={classes.badge}>
                                        <div
                                          className={classes.avatar}
                                          style={{
                                            color:
                                              currentConversation?.id === el?.id
                                                ? "#006112"
                                                : "#AAAAAA"
                                          }}
                                        >
                                          {user?.vendor?.brand
                                            .split(" ", 1)
                                            .map(item => item.slice(0, 1))
                                            .join("")}
                                        </div>
                                        <span
                                          className={
                                            classes.badgeAvatar +
                                            " " +
                                            classes.dot
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className={classes.mainListItem}>
                                      <span
                                        className={
                                          currentConversation?.id === el?.id
                                            ? classes.listItemText +
                                              " " +
                                              classes.listItemTextSpan
                                            : classes.listItemTextSpan
                                        }
                                      >
                                        {user?.vendor?.brand || user?.firstName}
                                      </span>
                                      <p className={classes.listItemTextP}>
                                        {el?.messages?.length !== 0
                                          ? trimString(
                                              el?.messages?.[
                                                el?.messages?.length - 1
                                              ]?.content,
                                              15
                                            )
                                          : "No Messages"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className={classes.divider} />
                                </React.Fragment>
                              );
                            })}
                        </Box>
                      </>
                    )}
                </div>
              </Grid>
              <Grid
                item="true"
                xs={9}
                tempStyle={{
                  display: size.width <= 958 ? "none" : "flex",
                  flexDirection: "column"
                }}
              >
                <div className={classes.rightSideWrapper}>
                  {configSupplierChat === "ON" &&
                  !currentConversation &&
                  pathname.includes("quote") ? (
                    <Box
                      customStyle={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#eee"
                      }}
                    >
                      <TypoGraphy
                        variant="h5"
                        style={{
                          textAlign: "center"
                        }}
                      >
                        Do you have any Additional Requirements for{" "}
                        {userForCaseWelcomeMessage?.vendor?.brand
                          .split(" ", 1)
                          .map(item => item.slice(0, 4))
                          .join("")}{" "}
                        ?
                      </TypoGraphy>
                      <TypoGraphy
                        variant="h6"
                        style={{
                          textAlign: "center"
                        }}
                      >
                        Please chat to the supplier to get more detail
                      </TypoGraphy>
                    </Box>
                  ) : (
                    <MessageDetail
                      usingMarketplaceSupport={usingMarketplaceSupport}
                      currentChat={currentChat}
                      currentConversation={currentConversation}
                      sendMessage={sendMessage}
                      setCurrentConversation={setCurrentConversation}
                      supplierBasket={supplierBasket}
                      inputFIeldRef={inputFIeldRef}
                      supplierInfo={supplierInfo}
                      count={count}
                      setCount={setCount}
                      chatSubscription={chatSubscription}
                      statusMarketplaceSupport={statusMarketplaceSupport}
                      messageBoxMutation={sendMessage}
                      currentQuoteBasket={currentQuoteBasket}
                      usingScrollToBottom={usingScrollToBottom}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Modal
        open={showChatPopupDetail}
        onClose={handleCloseModalChatDetail}
        className={classes.chatWrapper}
      >
        <Box
          customStyle={{
            width: "95vw",
            height: "85vh",
            background: "#fff",
            padding: 10
          }}
        >
          <MessageDetail
            usingMarketplaceSupport={usingMarketplaceSupport}
            currentChat={currentChat}
            currentConversation={currentConversation}
            sendMessage={sendMessage}
            handleCloseModal={() => {
              setShowChatPopupDetail(false);
              dispatch(hideChatQuoteBasket());
            }}
            setCurrentConversation={setCurrentConversation}
            mobileView
            supplierBasket={supplierBasket}
            inputFIeldRef={inputFIeldRef}
            supplierInfo={supplierInfo}
            count={count}
            setCount={setCount}
            chatSubscription={chatSubscription}
            statusMarketplaceSupport={statusMarketplaceSupport}
            messageBoxMutation={sendMessage}
            currentQuoteBasket={currentQuoteBasket}
            usingScrollToBottom={usingScrollToBottom}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Chat;
