export const VID = process.env.VID;
const PREVIEW_PROJECT_LINK = process.env.PREVIEW_PROJECT_LINK;
const PUBLISH_PROJECT_LINK = process.env.PUBLISH_PROJECT_LINK;
const STORE_LINK_ROOT = process.env.STORE_LINK;

export const SHOW_PER_PAGE = process.env.PER_PAGE;

export const IS_PUBLISHED = process.env.IS_PUBLISHED == "true" ? true : false;
export const PREVIEW = IS_PUBLISHED ? "" : "/preview";

export const PROJECT_LINK = IS_PUBLISHED
  ? PUBLISH_PROJECT_LINK
  : PREVIEW_PROJECT_LINK;

export const STORE_LINK = STORE_LINK_ROOT + PREVIEW + "/store";

const locationFunc = () => {
  let location;
  let link;
  let preview;
  if (IS_PUBLISHED) {
    preview = "";
    link = PUBLISH_PROJECT_LINK;
  } else {
    preview = "/preview";
    link = PREVIEW_PROJECT_LINK;
  }

  // if (
  //   typeof window !== "undefined" &&
  //   window.location.host.includes("localhost")
  // ) {
  location = link;
  // } else {
  // location = preview;
  // }

  return location;
};

export const LINK_DISTRIBUTION = locationFunc();
