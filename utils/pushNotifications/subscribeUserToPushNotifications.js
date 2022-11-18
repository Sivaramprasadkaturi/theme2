import axios from "axios";

const applicationServerPublicKey =
  "BFj6RV4VTD48YzLojREDvYzeevzyA_VPg-x3FbU1SB3Tq6grk6eRLBLZ6nwbGX7EWTDK237_8KnhjA45qf5x66k";

const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const fnBrowserDetect = () => {
  let userAgent = navigator.userAgent;
  let browserName;

  if (/chrome|chromium|crios/i.test(userAgent)) {
    browserName = "chrome";
  } else if (/firefox|fxios/i.test(userAgent)) {
    browserName = "firefox";
  } else if (/safari/i.test(userAgent)) {
    browserName = "safari";
  } else if (/opr\//i.test(userAgent)) {
    browserName = "opera";
  } else if (/edg/i.test(userAgent)) {
    browserName = "edge";
  }

  return browserName;
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

const getSubscriptionObject = (subscription, topic) => {
  return {
    subscription: {
      ...subscription
    },
    topic: topic,
    attribute: "",
    deviceInfo: {
      os: "",
      name: fnBrowserDetect(),
      device: getDeviceType(),
      version: ""
    },
    userLocation: {
      country: "",
      region: "",
      city: "",
      longitude: "",
      latitude: ""
    }
  };
};

const subscribePush = async (vendorId, topic) => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  const registration = await navigator.serviceWorker.ready;
  if (!registration.pushManager) {
    alert("Push Unsupported");
    return false;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true, //Always display notifications
    applicationServerKey: applicationServerKey
  });

  const newSubscription = getSubscriptionObject(subscription.toJSON(), topic);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/notification.ajx?vid=${vendorId}`,
    newSubscription,
    {
      withCredentials: true,
      responseType: "json"
    }
  );
  return data.__Success;
};

const unsubscribePush = async (vendorId, topic) => {
  axios.delete(
    `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/notifications/unsubscribe`,
    {
      data: {
        vendorId,
        topic,
        device: getDeviceType(),
        deviceName: fnBrowserDetect()
      }
    }
  );
  return true;
};

const isUserSubscribed = async (vendorId, topic) => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/notifications/check`,
      {
        withCredentials: true,
        responseType: "json",
        params: {
          vendorId,
          device: getDeviceType(),
          deviceName: fnBrowserDetect()
        }
      }
    );
    console.log("data", data);
    if (data.topicsSubscribed?.some(el => el.topic === topic)) {
      console.log("haha1");
      const newSubscription = getSubscriptionObject(
        subscription.toJSON(),
        topic
      );
      await axios.post(
        `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/notification.ajx?vid=${vendorId}`,
        newSubscription,
        {
          withCredentials: true,
          responseType: "json"
        }
      );
      console.log("haha2");
      return true;
    }
    return false;
  } else {
    return false;
  }
};

export { subscribePush, unsubscribePush, isUserSubscribed };
