let placeSearch, autocomplete;
let componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "long_name",
  postal_code_prefix: "long_name"
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.

  const inputEl = document.getElementById("autocompleteGoogle");
  if (inputEl) {
    autocomplete = new google.maps.places.Autocomplete(inputEl, {
      types: ["geocode"]
    });
    autocomplete.addListener("place_changed", fillInAddress);
  }
}

let globalPlace = {};

function fillInAddress() {
  // Get the place details from the autocomplete object.
  let place = autocomplete.getPlace();
  globalPlace = autocomplete.getPlace();

  for (let component in componentForm) {
    document.getElementById(component).value = "";
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (let i = 0; i < place.address_components.length; i++) {
    let addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      let val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

/* function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
  console.info("cokkie", document.cookie);
  console.info("cookie", document.cookie, JSON.stringify(cvalue), expires);
} */

/* function getCookie(name) {
  let result = document.cookie.match(new RegExp(name + "=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
} */

function createPlaceObj() {
  if (
    document.getElementById("locality").value != "" &&
    globalPlace.geometry.viewport
  ) {
    return (placeObj = {
      city: document.getElementById("locality").value,
      state: document.getElementById("administrative_area_level_1").value,
      postal:
        document.getElementById("postal_code").value ||
        document.getElementById("postal_code_prefix").value,
      country: document.getElementById("country").value,
      lat: globalPlace.geometry.location.lat(),
      long: globalPlace.geometry.location.lng(),
      date: new Date()
    });
  } else {
    return null;
  }
}

function confirmLocation() {
  // create object
  let placeObj = createPlaceObj();
  return placeObj;
}
