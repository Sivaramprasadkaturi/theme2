importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

// The plugin will pass the files to cache here
workbox.precaching.precacheAndRoute([]);

// Another things
self.addEventListener("push", event => {
  const { notification } = event.data.json();
  const title = notification.title;
  const options = {
    body: notification.body,
    icon: "images/icon.png",
    badge: "images/badge.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
