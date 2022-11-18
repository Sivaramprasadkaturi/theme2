import React, { useEffect, useState } from "react";
import {
  isUserSubscribed,
  subscribePush,
  unsubscribePush
} from "../../utils/pushNotifications/subscribeUserToPushNotifications";

const NOTIFICATION_TOPICS = Object.freeze({
  NEW_CHAT_MESSAGE_EVENT: Symbol("NEW_CHAT_MESSAGE_EVENT").description,
  PRICE_CHANGE_EVENT: Symbol("PRICE_CHANGE_EVENT").description,
  QUOTE_REQUEST_STATUS_EVENT: Symbol("QUOTE_REQUEST_STATUS_EVENT").description
});

const useSubscribeToPushNotifications = ({
  defaultVendorId = null,
  defaultNotificationTopic = null
}) => {
  if (!Object.values(NOTIFICATION_TOPICS).includes(defaultNotificationTopic)) {
    throw new Error("Unsupported Push Notification topic");
  }
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(async () => {
    const isSubscribed = await isUserSubscribed(
      defaultVendorId,
      defaultNotificationTopic
    );
    setIsSubscribed(isSubscribed);
  }, [defaultVendorId, defaultNotificationTopic]);

  const subscribeOrUnsubscribe = async (
    vendorId = defaultVendorId,
    notificationTopic = defaultNotificationTopic
  ) => {
    if (!Object.values(NOTIFICATION_TOPICS).includes(notificationTopic)) {
      throw new Error("Unsupported Push Notification topic");
    }
    console.log("test1234", isSubscribed);
    if (isSubscribed) {
      await unsubscribePush(defaultVendorId, defaultNotificationTopic);
      setIsSubscribed(false);
    } else {
      try {
        subscribePush(vendorId, notificationTopic);
      } catch (e) {
        setIsSubscribed(false);
      }
      setIsSubscribed(true);
    }
  };

  return [isSubscribed, subscribeOrUnsubscribe];
};

export { NOTIFICATION_TOPICS, useSubscribeToPushNotifications };
