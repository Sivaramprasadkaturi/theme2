import Modal from "../AC-UI-Elements/Modal/Modal";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { hideChatPopup } from "../../redux/actions/chatActions";
import classes from "./Styles/Chat.module.css";
import Chat from "./Chat";

const ChatModal = ({ params }) => {
  const showChatPopup = useSelector(
    state => state.chatReducer.showChatPopup,
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideChatPopup());
  };

  return (
    <Modal
      open={showChatPopup}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.chatWrapper}
    >
      <Chat params={params} showChatPopup={showChatPopup} />
    </Modal>
  );
};

export default ChatModal;
