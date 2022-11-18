import * as types from "../types";

const initialState = {
  showChatPopup: false,
  showChatFloatingIcon: true,
  showChatQuoteBasket: false,
  chatWithVendor: null,
  activeDist: "",
  makeAnOffer: "",
  defaultPlaceOfferString: ""
};

const chatReducer = (
  state = initialState,
  {
    type,
    vendorId = null,
    activeDist,
    makeAnOfferValue,
    defaultPlaceOfferString
  }
) => {
  switch (type) {
    case types.SHOW_CHAT_POPUP:
      return {
        ...state,
        showChatPopup: true,
        chatWithVendor: vendorId
      };
    case types.HIDE_CHAT_POPUP:
      return {
        ...state,
        showChatPopup: false
      };

    case types.SHOW_CHAT_FLOATING_ICON:
      return {
        ...state,
        showChatFloatingIcon: true
      };
    case types.HIDE_CHAT_FLOATING_ICON:
      return {
        ...state,
        showChatFloatingIcon: false
      };

    case types.SHOW_CHAT_QUOTE_BASKET:
      return {
        ...state,
        showChatQuoteBasket: true,
        activeDist: activeDist.name,
        chatWithVendor: activeDist.vendorId,
        quoteRequestId: activeDist.quoteRequestId || null
      };
    case types.HIDE_CHAT_QUOTE_BASKET:
      return {
        ...state,
        showChatQuoteBasket: false,
        chatWithVendor: null
      };

    case types.MAKE_AN_OFFER:
      return {
        ...state,
        makeAnOffer: makeAnOfferValue,
        defaultPlaceOfferString
      };

    default:
      return state;
  }
};

export default chatReducer;
