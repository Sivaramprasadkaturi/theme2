import { useState, useEffect, useMemo } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  getDeliveryOptions,
  setAddToCartValidationErrors
} from "../../redux/actions/productActions";
import { toggleLocationBoxAction } from "../../redux/actions/handlersAction";
import styled from "styled-components";
import { MdOutlineShoppingCart } from "react-icons/md";
import WishListBar from "./WishListBar";
import LinearLoading from "../elements/LinearLoading/LinearLoading";
import { useTranslation } from "next-i18next";
import { MdChat } from "react-icons/md";
import { setAuthModal } from "../../redux/actions/app";
import {
  GET_CHAT,
  GET_RECEIVER_ID,
  GET_THE_CURRENT_USER
} from "../Chat/queries";

import { INIT_CHAT } from "../Chat/mutations";
import { showChatPopup } from "../../redux/actions/chatActions";
import { useMutation, useQuery } from "@apollo/client";

const AddToCart = ({
  calculatedPriceAndFoundDist,
  productUnavailable,
  priceInv,
  storeInfo,
  numberOfItems,
  productDetailsData
}) => {
  const dispatch = useDispatch();

  const { t } = useTranslation("translation");
  const login = useSelector(state => state.loginReducer, shallowEqual);

  const [inStock, setInStock] = useState(true);
  const [inStockQty, setInStockQty] = useState("");

  console.log("PRODUCT UNAV ", productUnavailable);

  const mainItemIdState = useSelector(
    state => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );
  const itemIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const supplierInfoState = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const priceState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const distIdStateAndPrice = useMemo(() => {
    if (
      supplierInfoState?.[0]?.distributorOrder?.[0]?.distid &&
      priceState?.prices?.[0]?.price_1
    ) {
      const firstDistId = supplierInfoState[0].distributorOrder[0].distid;
      const price = priceState.prices.find(
        inv => inv.distributorId == firstDistId
      );

      return { distId: firstDistId, price };
    }

    return { distId: null, price: null };
  }, [supplierInfoState, priceState]);

  console.log("distIdStateAndPrice", distIdStateAndPrice);

  const checkBoxItemSelected = useSelector(
    state => state.productReducer.checkboxItemSelected,
    shallowEqual
  );

  const checkBoxItem = useSelector(
    state => state.productReducer.accessoryModal,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const attributeDetailsState = useSelector(
    state => state.productReducer.itemDetail.attributeDetails,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const requestingAddToCartState = useSelector(
    state => state.productReducer.requestingAddToCart,
    shallowEqual
  );

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );

  const authModalState = useSelector(
    state => state.appReducer.authModal,
    shallowEqual
  );

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const handleCheckUserlocationState = () => {
    dispatch(toggleLocationBoxAction(true));
  };

  const handleAddToCart = () => {
    /*   if (!userLocationState.lat && !userLocationState.lng) {
            handleCheckUserlocationState();
            return;
        } */

    let attributesObject = null;

    let requiredFields = [];

    if (
      selectedProductAttributesState.hasOwnProperty(
        mainItemIdState || itemIdState
      )
    ) {
      attributesObject =
        selectedProductAttributesState[mainItemIdState || itemIdState];

      let expectedAttributes = attributeDetailsState.reduce((p, c) => {
        const { screenname, attributeid } = c;
        p = [...p, { screenname, attributeid }];
        return p;
      }, []);

      let receivedAttributeIds = Object.keys(attributesObject);

      if (mainItemIdState != 0) {
        expectedAttributes.forEach(attr => {
          if (!receivedAttributeIds.includes(attr.attributeid.toString()))
            requiredFields.push(attr.screenname);
        });
      } else {
        expectedAttributes.forEach(attr => {
          requiredFields.push(attr.screenname);
        });
      }
    } else {
      if (attributeDetailsState && attributeDetailsState.length > 0) {
        let expectedAttributes = attributeDetailsState.reduce((p, c) => {
          const { screenname, attributeid } = c;
          p = [...p, { screenname, attributeid }];
          return p;
        }, []);

        expectedAttributes.forEach(attr => {
          requiredFields.push(attr.screenname);
        });
      }
    }

    dispatch(setAddToCartValidationErrors(requiredFields));

    if (requiredFields.length > 0) {
      return;
    }

    dispatch(
      getDeliveryOptions(
        distIdStateAndPrice.distId,
        distIdStateAndPrice.price.itemcode,
        numberOfItems,
        distIdStateAndPrice.price.itemid,
        attributesObject
      )
    );

    if (checkBoxItemSelected) {
      dispatch(
        getDeliveryOptions(
          // priceState.prices[0].distributorId,
          checkBoxItem.priceInv.prices[0].distributorId,
          //priceState.code,
          checkBoxItem.details.code,
          //numberOfItems,
          1,
          //priceState.itemid,
          checkBoxItem.details.itemid,
          //attributesObject,
          null
        )
      );
    }
  };

  const { data: chatData } = useQuery(GET_CHAT);

  const [initChat] = useMutation(INIT_CHAT, {
    refetchQueries: [
      { query: GET_THE_CURRENT_USER, variables: { email: loginNameState } }
    ]
  });
  const { data: dataReceiverId } = useQuery(GET_RECEIVER_ID, {
    variables: {
      vendorId: storeInfo?.[0]?.distributorOrder?.[0]?.supplier_vid
    }
  });

  const handleEnquire = async event => {
    event.stopPropagation();
    if (securityTokenState) {
      // check if user is already in the system
      // if user exists
      // TODO: check if there is an existing chat between user-supplier
      if (
        dataReceiverId?.users?.[0]?.id &&
        !chatData?.chat?.some(chat =>
          chat?.chat_users?.some(
            user => user?.user?.id === dataReceiverId?.users?.[0]?.id
          )
        )
      ) {
        initChat({
          variables: {
            userName: login.loginName,
            email: login.loginName,
            firstName: login.firstName,
            lastName: login.lastName,
            reciever_id: dataReceiverId?.users?.[0]?.id
          }
        });
      }
      dispatch(showChatPopup(storeInfo?.vendorId));
    } else dispatch(setAuthModal(!authModalState));
  };

  return (
    <Wrapper>
      <div className="flex flex-wrap mt-5">
        {/*{productUnavailable === false ? (*/}



        <div
          tabIndex={"0"}
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.target.click();
            }
          }}
          className="focusAble addToCartBtn mb-5"
          title="Add to Cart"
          onClick={() => handleAddToCart()}
        >
          {/* <MdOutlineShoppingCart style={{ marginRight: "5px" }} /> */}
          <span>{t("js.item.addtocart")}</span>
        </div>



        {/* {requestingAddToCartState ? <LinearLoading /> : null}
        <WishListBar
        product={productDetailsData}
        /> */}



          {/* // data={props.data}
          // productUnavailable={props.productUnavailable}
          // price={price} */}

          
          


        {/* <button className="chatSellerButton" onClick={handleEnquire}>
          <div className="chatIcon">
            <MdChat />
          </div>
          <span>CHAT WITH SELLER</span>
        </button> */}











        {/*) */}
        {/*: (*/}
        {/*    <p style={{ margin: "20px 0" }}>*/}
        {/*        SORRY, THIS PRODUCT IS CURRENTLY UNAVAILABLE*/}
        {/*    </p>*/}
        {/*)}*/}

        {/*         <div
                id="buyBoxQuoteBtn"
                className={`add-to-order${inStock ? "" : " active"}`}
              >
                <div
                  className="addToCartBtn"
                  title="Add to Order"
                  onClick={() => handleAddToCart(true)}
                >
                  <div>
                    <span>Add to Order</span>
                  </div>
                  <div>
                    <i className="material-icons add-icon">description</i>
                  </div>
                </div>
              </div> */}
        {/* <div id="buyBoxEnquiryBtn">
                <div
                  id="enquiry-204"
                  className="addToCartBtn sendEnquiryBtn"
                  title={translate("js.item.enquiry")}
                  onClick={handleEnquiryModalOpenClicked}
                >
                  <div>{translate("js.item.enquiry")}</div>
                  <div>
                    <span>
                      <i className="material-icons add-icon">mail_outline</i>
                    </span>
                  </div>
                </div>
              </div> */}

        {/* {isMobileState && (
                <WishListBarMobile
                  data={props.data}
                  productUnavailable={props.productUnavailable}
                  price={price}
                />
              )} */}

        {!inStock && (
          <>
            <div className="add-to-cart-stock-status">
              The supplier may still be in progress updating the inventory for
              this product. Click the Chat button below to chat with the
              supplier to confirm availability.
            </div>
            {/* <NotifyOnReStock
                      supplier={{
                        stock: priceState.invs[0].instock,
                        code: priceState.code,
                        itemid: priceState.itemid
                      }}
                      renderedInsideAddToCartBox={true}
                    /> */}
          </>
        )}
      </div>
      {/* <ChatTheSeller storeSellerData={props.storeInfo.storeSellerData} /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .addToCardBoxWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }

  #buyBoxAddToCartBtn {
    display: flex;
  }

  .addToCartBtn {
    background-color: #e21a23;
    //width: 100%;
    font-size: 16px;
    text-align: center;
    padding: 10px 20px;
    cursor: pointer;
    /* right: 0px; */
    /* bottom: auto; */
    /* position: relative; */
    text-transform: uppercase;
    font-weight: normal;
    min-width: 180px;
    border-radius: 3px;
  }
`;

export default AddToCart;
