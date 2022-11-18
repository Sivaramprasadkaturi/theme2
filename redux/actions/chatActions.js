import * as types from "../types";

export const showChatPopup = vendorId => ({
  type: types.SHOW_CHAT_POPUP,
  vendorId
});

export const hideChatPopup = () => ({
  type: types.HIDE_CHAT_POPUP
});

export const showChatFloatingIcon = () => {
  localStorage.setItem("showChatFloatingIcon", JSON.stringify(true));

  return {
    type: types.SHOW_CHAT_FLOATING_ICON
  };
};

export const hideChatFloatingIcon = () => ({
  type: types.HIDE_CHAT_FLOATING_ICON
});

export const showChatQuoteBasket = activeDist => ({
  type: types.SHOW_CHAT_QUOTE_BASKET,
  activeDist
});

export const hideChatQuoteBasket = () => ({
  type: types.HIDE_CHAT_QUOTE_BASKET
});

export const makeAnOffer = (makeAnOfferValue, defaultPlaceOfferString) => ({
  type: types.MAKE_AN_OFFER,
  makeAnOfferValue,
  defaultPlaceOfferString
});
