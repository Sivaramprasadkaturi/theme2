import { BOOK_A_MEETING } from "../../redux/links";

export const bookViewing = (supCode, form, callBack, supVid = null) => {
  fetch(BOOK_A_MEETING(supCode, supVid), {
    method: "POST",
    body: form,
    headers: {
      Accept: "*/*",
      credentials: "same-origin"
    },
    mimeType: "multipart/form-data",
    data: form
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      callBack(json);
    })
    .catch(err => {
      console.error("err booking a viewing:", err);
    });
};
