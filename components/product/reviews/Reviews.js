import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  MdOutlineCancel,
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdStarRate,
  MdStarHalf,
  MdAdd,
  MdStarOutline
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { setReviewModalStateAction } from "../../../redux/actions/productActions";
import { VID } from "../../../project-config";
import { ITEM_REVIEW } from "../../../redux/links";
import { setAuthModal } from "../../../redux/actions/app";
import Image from "next/image";
import _objI from "../../../utils/_objI";
import { useTranslation } from "next-i18next";

const Modal = styled.div`
  position: fixed;
  z-index: 1300;
  inset: 0px;
  display: flex;
  align-items: center;
  .bg {
    z-index: -1;
    position: fixed;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  }
  .reviewImgModal {
    width: 80%;
    height: calc(100% - 38px);
    z-index: 1600;
    background: white;
    margin: auto;
    padding: 20px;
  }
  @media only screen and (max-width: 768px) {
    .reviewImgModal {
      width: 100%;
    }
  }
`;

const Reviews = ({ reviews }) => {
  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const { t } = useTranslation("translation");
  const [reviewImgModal, setReviewImgModal] = useState({});
  const [reviewAllImgModal, setReviewAllImgModal] = useState(false);
  const [img_upload_file, set_img_upload_file] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK;

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    base64Image: "",
    action: "PLACEHOLDER",
    itemcode: "PLACEHOLDER",
    svid: "PLACEHOLDER",
    ivid: "PLACEHOLDER",
    rating: ""
  });

  const [fileLabel, setFileLabel] = useState({});

  const [nextReviews, setNextReviews] = useState([]);

  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    text: "",
    color: "",
    show: false
  });
  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({ text: "", color: "", show: false });
      }, 3000);
    }
  }, [alert.show]);
  const reviewsModalOpenState = useSelector(
    state => state.productReducer.reviewsModalOpen,
    shallowEqual
  );
  const loginReducer = useSelector(state => state.loginReducer, shallowEqual);

  const toggleReviewModal = () =>
    dispatch(setReviewModalStateAction(!reviewsModalOpenState));

  const [imgPreview, setImgPreview] = useState([]);

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
            <MdStarOutline />
          </div>
        );
    };
    return (
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((_, i) => renderStarBasedOnAvgRating(i + 1))}
      </div>
    );
  };
  const hiddenInput = useRef(null);
  const [showInfo, setShowInfo] = useState(false);

  const onFileChange = e => {
    const file = e.target.files[0];
    if (!file) {
      setFileLabel({
        name: e.target.name,
        type: "red",
        msg: "Please select file."
      });
      return false;
    }
    if (!file.name.match(/\.(pdf|png|jpg|jpeg)$/)) {
      setFileLabel({
        name: e.target.name,
        type: "red",
        msg: "Please select valid file."
      });
      return false;
    }
    set_img_upload_file(file);

    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setFormData({ ...formData, base64Image: reader.result });
      setImgPreview([reader.result]);
    }.bind(this);
  };

  const onSubmit = async () => {
    let form = new FormData();

    if (img_upload_file !== "") {
      form.append("title", formData.title);
      form.append("details", formData.details);
      form.append("img_upload_file", img_upload_file);
      form.append("image", "img_upload_file");
      form.append("base64Image", "");

      form.append("itemcode", itemDetailState.code);
      form.append("action", "add");
      form.append("itemid", itemDetailState.itemid);
      form.append("svid", VID);
      form.append("ivid", itemDetailState.vendorid);
      form.append("rating", formData.rating);
    } else {
      form.append("title", formData.title);
      form.append("details", formData.details);
      form.append("itemcode", itemDetailState.code);
      form.append("action", "add");
      form.append("itemid", itemDetailState.itemid);
      form.append("svid", VID);
      form.append("ivid", itemDetailState.vendorid);
      form.append("rating", formData.rating);
    }

    fetch(ITEM_REVIEW, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data"
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.__Success == "true") {
          setAlert({
            text: "Review submited successfully.",
            color: "green",
            show: true
          });

          nextReviews.length > 0
            ? setNextReviews([
                ...nextReviews,
                {
                  author: data.__Result.review.nickname,
                  date: new Date(
                    data.__Result.review.reviewdate.time
                  ).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }),
                  details: data.__Result.review?.review
                    ? data.__Result.review?.review
                    : undefined,
                  image: data.__Result.review?.image
                    ? data.__Result.review?.image
                    : undefined,
                  rating: data.__Result.review.rating,
                  reviewid: data.__Result.review.itemreviewid,
                  title: data.__Result.review?.title
                    ? data.__Result.review?.title
                    : undefined
                }
              ])
            : setNextReviews([
                {
                  author: data.__Result.review.nickname,
                  date: new Date(
                    data.__Result.review.reviewdate.time
                  ).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }),
                  details: data.__Result.review?.review
                    ? data.__Result.review?.review
                    : undefined,
                  image: data.__Result.review?.image
                    ? data.__Result.review?.image
                    : undefined,
                  rating: data.__Result.review.rating,
                  reviewid: data.__Result.review.itemreviewid,
                  title: data.__Result.review?.title
                    ? data.__Result.review?.title
                    : undefined
                }
              ]);
          setTimeout(() => {
            toggleReviewModal();
          }, 3000);
        } else if (
          data &&
          data.__Success == "false" &&
          data.__Result.code === "DUPLICATEREVIEW"
        ) {
          setAlert({
            text: "sorry you have already reviewed this item.",
            color: "red",
            show: true
          });
          setTimeout(() => {
            toggleReviewModal();
          }, 3000);
        } else {
          setAlert({
            text: "Somthing went wrong.",
            color: "red",
            show: true
          });
        }

        // setReviewJsonResponse(data);
        // if (data && data.__Success == "true")
        //   dispatch(reFetchProductInitialState(productLinkState));
        // setMessageStatus(statusText);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Wrapper>
        <h2 className="flex items-center justify-between w-full px-6 py-6 mt-0 font-medium uppercase border border-gray-300 md:mt-5 md:border-none">
          {t("js.item.reviews")}
          <span
            className="flex text-2xl cursor-pointer text-main-orange md:hidden"
            onClick={e => setShowInfo(!showInfo)}
          >
            {showInfo ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </span>
        </h2>

        <div
          className={`w-full  md:mt-5 mt-0 p-4 ${
            showInfo ? "hidden" : ""
          } border border-gray-300 flex flex-col md:flex-row  items specs md:border-none`}
        >
          <div className="flex flex-col w-full pr-0 md:pr-6">
            <p className="title">{t("review.inputRating")}</p>

            <div className="flex">
              {[...reviews, ...nextReviews].length > 0 && (
                <div className="flex items-center mb-3">
                  {renderRatingStars(
                    Math.round(
                      ([...reviews, ...nextReviews].reduce(
                        (total, next) => total + Number(next.rating),
                        0
                      ) /
                        [...reviews, ...nextReviews].length) *
                        2
                    ) / 2
                  )}

                  <p className="mx-2">
                    {Math.round(
                      ([...reviews, ...nextReviews].reduce(
                        (total, next) => total + Number(next.rating),
                        0
                      ) /
                        [...reviews, ...nextReviews].length) *
                        2
                    ) / 2}
                    out of 5 Stars, {[...reviews, ...nextReviews].length} Review
                    {[...reviews, ...nextReviews].length > 1 && "s"}
                  </p>
                </div>
              )}
              <p
                tabIndex={"0"}
                onKeyDown={e => {
                  if (e.code === "Enter") {
                    e.target.click();
                  }
                }}
                className="mb-3 underline cursor-pointer"
                onClick={() => {
                  if (loginReducer.securityToken) {
                    toggleReviewModal();
                  } else {
                    dispatch(setAuthModal(true));
                  }
                }}
              >
                {t("js.item.review.write")}
              </p>

              {[...reviews, ...nextReviews].length > 0 && (
                <div className="flex flex-col" style={{ color: "#333" }}>
                  {[0, 1, 2, 3, 4].map((_, i) => {
                    return (
                      <div
                        key={i + 1}
                        className="flex items-center mb-3 text-xs"
                      >
                        <span className="w-3"> {i + 1}</span>
                        <div className="w-3 mr-3" style={{ fontSize: "1.5em" }}>
                          <MdStarRate />
                        </div>
                        <div
                          className="relative w-full h-4 py-1"
                          style={{ background: "#ccc" }}
                        >
                          <div
                            className="absolute top-0 bottom-0 left-0 h-full"
                            style={{
                              background: "#006112",
                              width:
                                Math.round(
                                  (([...reviews, ...nextReviews].filter(
                                    review => review.rating == 1 + i
                                  ).length *
                                    100) /
                                    [...reviews, ...nextReviews].length) *
                                    10
                                ) /
                                  10 +
                                "%"
                            }}
                          >
                            {[...reviews, ...nextReviews].filter(
                              review => review.rating == 1 + i
                            ).length > 0 && (
                              <p className="mx-2 text-xs text-white">
                                {Math.round(
                                  (([...reviews, ...nextReviews].filter(
                                    review => review.rating == 1 + i
                                  ).length *
                                    100) /
                                    [...reviews, ...nextReviews].length) *
                                    10
                                ) / 10}{" "}
                                %
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="ml-2">
                          {
                            [...reviews, ...nextReviews].filter(
                              review => review.rating == 1 + i
                            ).length
                          }
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {[...reviews, ...nextReviews].filter(review => review.image)
              .length > 0 && (
              <>
                <p className="mt-6 title ">REVIEWER IMAGES</p>

                <div className="flex flex-wrap w-full pl-0 md:pl-6">
                  {" "}
                  {[...reviews, ...nextReviews]
                    .filter(review => review.image)
                    .map((review, r) => (
                      <div
                        className="mb-5 mr-3"
                        key={r}
                        style={{ color: "#333" }}
                      >
                        <div className="flex flex-col mt-2 text-sm font-normal">
                          {review.image && (
                            <div
                              className="w-20 h-20 mt-1 border cursor-pointer flex items-center"
                              onClick={() => {
                                setReviewImgModal({ ...review });
                                setReviewAllImgModal(false);
                              }}
                            >
                              <img
                                src={`${baseUrl}/store${review.image}`}
                                width="100"
                                height="100"
                                alt={"review " + review.title}
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
          {[...reviews, ...nextReviews].length > 0 && (
            <div className="flex flex-col w-full pl-0 mt-6 md:mt-0 md:pl-6">
              {" "}
              <p className="title">CUSTOMER REVIEWS</p>
              {[...reviews, ...nextReviews].map((review, r) => (
                <div className="mb-5" key={r} style={{ color: "#333" }}>
                  <div className="flex items-center w-full text-xs">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((_, i) => {
                        if (i + 1 <= review.rating) {
                          return (
                            <div key={i + 1} className="bulb">
                              <MdStarRate />
                            </div>
                          );
                        } else {
                          return (
                            <div key={i + 1} className="bulb">
                              <MdStarOutline />
                            </div>
                          );
                        }
                      })}
                    </div>
                    <p style={{ marginLeft: "5px" }}>
                      {review.rating} out of 5 Stars
                    </p>
                  </div>
                  <p className="mt-2 ">
                    Reviewed by{" "}
                    <span className="font-semibold">{review.author}</span> on{" "}
                    {review.date}
                  </p>
                  <div className="flex flex-col mt-2 text-sm font-normal">
                    <p className="mb-1"> {review.title}</p>
                    <p className="mb-1"> {review.details}</p>
                    {/* <p> {review.img}</p> */}

                    {review.image && (
                      <div
                        className="w-20 h-20 mt-1 border cursor-pointer flex items-center"
                        onClick={() => {
                          setReviewImgModal({ ...review });
                          setReviewAllImgModal(false);
                        }}
                      >
                        <img
                          src={`${baseUrl}/store${review.image}`}
                          width="100"
                          height="100"
                          alt={"review " + review.title}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
      {reviewsModalOpenState && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full"
          style={{ backgroundColor: "rgba(0,0,0,.3)" }}
        >
          <div
            className="relative z-20 w-10/12 p-5 overflow-auto bg-white md:w-6/12 lg:w-4/12"
            style={{
              maxHeight: "90vh",
              boxShadow: "0 0 4px 1px rgb(0 0 0 / 30%)"
            }}
          >
            <div
              className="absolute text-xl text-gray-800 cursor-pointer top-5 right-5"
              onClick={() => toggleReviewModal()}
            >
              <MdClose />
            </div>
            <div className="flex flex-col">
              <p className="text-lg ">{t("js.item.review")}</p>
              <input
                placeholder={t("text.title")}
                name="title"
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                className="w-full h-10 p-2 my-4 border outline-none appearance-none"
                style={{
                  borderColor: "#cdcdcd",
                  boxShadow: "0 0 4px #cdcdcd"
                }}
              />{" "}
              <textarea
                placeholder={t("text.details")}
                name="details"
                onChange={e =>
                  setFormData({ ...formData, details: e.target.value })
                }
                rows="10"
                className="w-full p-2 my-4 border outline-none appearance-none"
                style={{
                  borderColor: "#cdcdcd",
                  boxShadow: "0 0 4px #cdcdcd"
                }}
              />
              <div className="flex justify-between w-full my-4">
                {formData.rating ? <p>Rating {formData.rating} of 5</p> : <p />}
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((_, i) => {
                    return (
                      <div
                        style={{ fontSize: "2em" }}
                        key={i}
                        className="cursor-pointer"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            rating: i + 1
                          });
                        }}
                      >
                        {formData.rating >= i + 1 ? (
                          <MdStarRate />
                        ) : (
                          <MdStarOutline />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>{" "}
              <div>
                <input
                  type="file"
                  name="image"
                  ref={hiddenInput}
                  onChange={e => {
                    onFileChange(e);
                  }}
                  className="hidden opacity-0"
                />
                {imgPreview.length > 0 ? (
                  <div className="relative w-20 h-20">
                    <div
                      onClick={() => {
                        set_img_upload_file("");
                        setImgPreview([]);
                      }}
                      className="absolute text-2xl cursor-pointer top-1 right-1"
                    >
                      <MdOutlineCancel />
                    </div>
                    <img
                      src={imgPreview}
                      className="w-full h-full "
                      alt="formData.img_upload_file"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => hiddenInput.current.click()}
                    className="flex items-center justify-center w-20 h-20 text-5xl text-gray-700 cursor-pointer"
                    style={{
                      backgroundColor: "#c8c8c8",
                      border: "4px dashed #666"
                    }}
                  >
                    <MdAdd />
                  </div>
                )}
              </div>{" "}
              {alert.show && (
                <p
                  className={` text-${alert.color}-600 text-center w-full my-3 font-semibold`}
                >
                  {alert.text}
                </p>
              )}{" "}
              <button
                className="flex items-center justify-center w-full px-6 py-3 mt-3 text-white bg-main-primary"
                onClick={() => {
                  if (formData.rating === "") {
                    setAlert({
                      text: "Rating is required.",
                      color: "red",
                      show: true
                    });
                  } else if (formData.details === "") {
                    setAlert({
                      text: "Details is required.",
                      color: "red",
                      show: true
                    });
                  } else {
                    onSubmit();
                  }
                }}
              >
                {t("text.submitReview")}
              </button>{" "}
            </div>
          </div>
        </div>
      )}

      {_objI(reviewImgModal) ? (
        <Modal>
          <div className="bg"></div>

          <div className="relative flex justify-between reviewImgModal">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between w-full h-12 p-3 cursor-pointer bg-gray-50">
              {" "}
              <p className="text-xs" onClick={() => setReviewAllImgModal(true)}>
                View All Images
              </p>
              <div
                onClick={() => {
                  setReviewImgModal({});
                  setReviewAllImgModal(false);
                }}
              >
                {" "}
                <MdOutlineCancel className="text-3xl text-red-600" />
              </div>
            </div>
            {reviewAllImgModal ? (
              <div className="flex flex-wrap w-full mt-6">
                {[...reviews, ...nextReviews]
                  .filter(review => review.image)
                  .map((review, r) => (
                    <div
                      className="mb-5 mr-3"
                      key={r}
                      style={{ color: "#333" }}
                    >
                      <div className="flex flex-col mt-2 text-sm font-normal">
                        {review.image && (
                          <div
                            className="w-20 h-20 mt-1 border cursor-pointer"
                            onClick={() => {
                              setReviewImgModal({ ...review });
                              setReviewAllImgModal(false);
                            }}
                          >
                            <Image
                              src={`${baseUrl}/store${review.image}`}
                              width="100"
                              height="100"
                              alt={"review " + review.title}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <>
                {" "}
                <div className="w-6/12 h-full mt-12 p-8">
                  <img
                    style={{
                      height: "inherit",
                      objectFit: "contain"
                    }}
                    src={`${baseUrl}/store${reviewImgModal.image}`}
                    alt={"review " + reviewImgModal.title}
                  />
                </div>
                <div className="w-6/12 h-full mt-12" style={{ color: "#333" }}>
                  <div className="flex items-center w-full text-xs">
                    <div className="flex gap-2 mr-3">
                      {[0, 1, 2, 3, 4].map((_, i) => {
                        if (i + 1 <= reviewImgModal.rating) {
                          return (
                            <div key={i + 1} className="w-3 ">
                              <img
                                alt="star"
                                src="/icons/review-bulb-full.png"
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={i + 1} className="w-3 ">
                              <img
                                alt="star"
                                src="/icons/review-bulb-empty.png"
                              />{" "}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <p> {reviewImgModal.rating} out of 5 lumens</p>
                  </div>
                  <p className="mt-2 ">
                    Reviewed by{" "}
                    <span className="font-semibold">
                      {reviewImgModal.author}
                    </span>{" "}
                    on {reviewImgModal.date}
                  </p>
                  <div className="flex flex-col mt-2 text-sm font-normal">
                    <p className="mb-1"> {reviewImgModal.title}</p>
                    <p className="mb-1"> {reviewImgModal.details}</p>
                  </div>
                </div>
              </>
            )}{" "}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

const Wrapper = styled.section`
  background-color: #fff;
  .bulb {
    font-size: 1.8em;
  }
  h2 {
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    color: #333;
    font-size: 18px;
  }
  .title {
    color: #006112;
    margin-bottom: 20px;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
  }
  .items {
    padding: 30px;
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 16px;
      padding: 16px;
    }
  }
`;

export default Reviews;
