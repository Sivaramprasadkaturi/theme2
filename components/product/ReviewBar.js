import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { setReviewModalStateAction } from "../../redux/actions/productActions";
import React from "react";
import { setAuthModal } from "../../redux/actions/app";

import { MdStarBorder, MdStarHalf, MdStarRate } from "react-icons/md";
import { useTranslation } from "next-i18next";

const ReviewBar = ({ reviews, reviewsRef, product, price }) => {
  const { t } = useTranslation("translation");
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += parseInt(reviews[i].rating, 10); //don't forget to add the base
  }

  // const [favouriteState, setFavouriteState] = useState("favorite_border");

  let avg = Math.round((sum / reviews.length) * 2) / 2;

  const dispatch = useDispatch();

  const reviewsModalOpenState = useSelector(
    state => state.productReducer.reviewsModalOpen,
    shallowEqual
  );

  const loginReducer = useSelector(state => state.loginReducer, shallowEqual);

  const toggleReviewModal = () =>
    dispatch(setReviewModalStateAction(!reviewsModalOpenState));

  const itemDetail = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  // const wishListState = useSelector(
  //   state => state.wishListReducer.wishlist,
  //   shallowEqual
  // );

  // const productPrice = useSelector(
  //   state => state.productReducer.priceInventory
  // );

  // let isItemWishlisted =
  //   wishListState.length > 0
  //     ? wishListState.some(w => w.id == itemDetail.itemId)
  //     : false;

  // const toggleWish = e => {
  //   e.preventDefault();

  //   dispatch(
  //     toggleWishListAction(
  //       product.itemid,
  //       product.title,
  //       product.shortdesc,
  //       (product.currency_sign = "$"),
  //       (product.image = `https://s3.ca-central-1.amazonaws.com/sls3.avetti.ca/${product.cimage}`),
  //       price,
  //       product.properties,
  //       product.url,
  //       wishListState
  //     )
  //   );
  // };

  // const handleToggleWishlistIcon = e => {
  //   isItemWishlisted
  //     ? setFavouriteState("favourite_border")
  //     : setFavouriteState("favourite");
  //   toggleWish(e);
  // };

  const renderRatingStars = avgRating => {
    const renderStarBasedOnAvgRating = i => {
      if (i <= avgRating)
        return (
          <div key={i} className="bulb">
            <MdStarRate />
          </div>
        );
      else if (i - 0.5 == avgRating)
        return (
          <div key={i} className="bulb">
            <MdStarHalf />
          </div>
        );
      else
        return (
          <div key={i} className="bulb">
            <MdStarBorder />
          </div>
        );
    };
    return (
      <div className="bulbs">
        {[0, 1, 2, 3, 4].map((_, i) => renderStarBasedOnAvgRating(i + 1))}
      </div>
    );
  };

  const executeScroll = el => {
    el.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <Wrapper style={{ flexDirection: reviews.length > 0 ? "column" : "row" }}>
      <div
        className="bulbsWrapper"
        style={{ width: reviews.length > 0 ? "100%" : "auto" }}
      >
        {renderRatingStars(avg)}
        {reviews.length > 0 && (
          <div className="rating">
            {avg} out of 5 Stars ( {reviews.length} )
          </div>
        )}
      </div>

      {/* <div
        className="btnWrapper"
        style={{
          width: reviews.length > 0 ? "100%" : "auto",
          marginTop: reviews.length > 0 ? "15px" : "8"
        }}
      >
        {reviews.length > 0 ? (
          <>
            <button onClick={() => executeScroll(reviewsRef)}>
              Read Reviews
            </button>
            <span className="pipe">|</span>
          </>
        ) : (
          <>
            <span className="noReviews">0 {t("js.item.reviews")}</span>
            <span className="pipe">|</span>
          </>
        )}

        <button
          onClick={() => {
            if (loginReducer.securityToken) {
              toggleReviewModal();
            } else {
              dispatch(setAuthModal(true));
            }
          }}
        >
          {t("js.item.review.write")}
        </button>
      </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bulbsWrapper {
    width: 100%;
    display: flex;
    align-items: baseline;
    .bulbs {
      display: flex;
      margin-right: 15px;
      .bulb {
        margin-right: 4px;
        font-size: 28px;
      }
    }
    .rating {
      font-size: 13px;
      color: var(--text-color);
      margin-top: 10px;
    }
  }
  .btnWrapper {
    margin-top: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    button {
      background: none;
      border: none;
      padding: 0;
      color: #a80008;
      font-size: 12px;
      text-decoration: underline;
    }
    .pipe {
      display: block;
      margin: 0 10px;
      color: #333;
    }
    .noReviews {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 768px) {
    .wrapper {
      flex-direction: column;
      .rating {
        font-size: 11px;
        margin-left: 0;
        margin-top: 10px;
      }
    }
    .hide {
      display: none;
    }
  }
`;

export default ReviewBar;
