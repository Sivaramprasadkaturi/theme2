function handlePermission(callback) {
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    report(callback, result.state);

    if (result.state == "granted") {
    } else if (result.state == "prompt") {
    } else if (result.state == "denied") {
    }
    result.onchange = function () {
      report(callback, result.state);
    };
  });
}

function report(callback, state) {
  callback(state);
}

export default handlePermission;
