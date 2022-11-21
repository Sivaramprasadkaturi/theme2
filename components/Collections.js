import { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchCollectionAction } from "../redux/actions/collectionsAction";

import Grid from "../components/uiElements/Grid/Grid";
import { useRouter } from "next/router";
import Image from "next/image";
import { LINK_DISTRIBUTION, VID, PREVIEW } from "../project-config";

import styled from "styled-components";
import { fetchingMenuSuccess } from "../redux/actions/menuActions";
import dynamic from "next/dynamic";

const DynamicCarousel = dynamic(() =>
  import("../components/uiElements/Carousel/Carousel")
);

const Wrapper = styled.div`
  .collectionCard {
    margin: 0 10px;
    border: 1px solid #c8c8c8;
    min-height: 200px;
    position: relative;
    cursor: pointer;
    height: 100%;
  }

  .collectionCard span {
    width: 100% !important;
    height: 100% !important;
  }

  .collectionCard img {
    object-fit: cover !important;
  }

  .collectionCardImg {
    width: 100%;
    position: absolute;
    height: 100%;
    object-fit: cover;
  }

  .collectionCard .collectionText {
    font-weight: 600;
    letter-spacing: 2px;
    position: absolute;
    height: 34px !important;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    padding: 10px;
    background-color: rgb(0, 0, 0, 0.8);
  }
`;

function Collections() {
  const dispatch = useDispatch();
  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  const router = useRouter();

  const collectionsState = useSelector(
    state => state.collectionsReducer.collections,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  useEffect(() => {
    console.info("borop", navCatsState);
    if (
      navCatsState &&
      navCatsState.childs &&
      navCatsState.childs[0] &&
      Object.keys(collectionsState).length == 0
    ) {
      console.log("NAV CATS STATE ", navCatsState);
      const { cid, name: cat, URL } = navCatsState.childs[0];
      dispatch(fetchCollectionAction(cat, URL, cid, "en"));
    }
  }, [navCatsState]);

  /* useEffect(() => {
    const navCats = {
      name: "Shop",
      vid: "20221020666",
      cid: "531751",
      thumbnail: "No Image",
      image: "No Image",
      position: "1",
      description: "Shop",
      metadescription:
        "This is a Demo Item. This product demonstrates item options. As options on the right side of the Micro Vault Midi, as an entry-level portable storage solution, is ideally suited to plug into a laptop",
      metakeywords: "Lenovo IdeaPad S110 Golf Shirts Sony Micro Vault Midi 4GB",
      URL: "shop/system/menu1",
      childs: [...menu.childs]
    };
    dispatch(fetchingMenuSuccess(navCats));
  }, [dispatch, menu.childs]); */

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 5
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 2
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1
    }
  };

  const renderPlaceholderCards = () => {
    return (
      <DynamicCarousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? true : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerclassName="carousel-container"
        removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListclassName="custom-dot-list-style"
        itemclassName="carousel-item-padding-40-px"
      >
        {Array(6)
          .fill(0, 0, 6)
          .map((v, i) => (
            <Grid key={i} item className="item-card-item" xs={12}>
              <div
                className="placeholder-item-card-wrapper"
                style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    height: "400px"
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      height: "40px"
                    }}
                  ></div>
                </div>
              </div>
            </Grid>
          ))}
      </DynamicCarousel>
    );
  };

  const renderLocation = () => {
    if (userLocationState.city != userLocationState.state) {
      return `${userLocationState.city}, ${userLocationState.state}`;
    } else {
      return `${userLocationState.city}, ${userLocationState.country}`;
    }
  };

  const handleChangeBtnClicked = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const handleCollectionCardClicked = (URL, facet, collectionsFacets) => {
    const facetParameter = `${
      collectionsFacets.code || collectionsFacets.name
    }=${facet.code || facet.value}`;

    const removeText = facet.removeText;

    router.push(
      {
        pathname: `/${URL}`,
        query: {
          facetParameter,
          removeText
        }
      },
      `/${URL}`
    );
  };

  const renderCollectionCards = (isLoading, collectionsFacets, cat, URL) => {
    return (
      <div>
        <div className="header-container">
          {!isLoading && collectionsFacets.facetValues.length > 0 ? (
            <DynamicCarousel
              autoPlaySpeed={3000}
              autoPlay={false}
              infinite={true}
              responsive={responsive}
              showArrows={true}
              ssr={false}
            >
              {collectionsFacets.facetValues
                .filter(facet => facet.count > 0)
                .map((facet, i) => {
                  console.log("Facet2", facet);
                  return (
                    <div
                      key={i}
                      onClick={() =>
                        handleCollectionCardClicked(
                          URL,
                          facet,
                          collectionsFacets
                        )
                      }
                      className="collectionCard no-select"
                    >
                      {/* <img
                        className="collectionCardImg"
                        src={`${LINK_DISTRIBUTION}/store/${VID}/assets/images/collections/${facet.text.replace(
                          "/",
                          "-"
                        )}.jpg`}
                        alt={facet.text}
                      /> */}
                      <Image
                        src={`${LINK_DISTRIBUTION}/store/${VID}/assets/images/collections/${facet.text.replace(
                          "/",
                          "-"
                        )}.jpg`}
                        width={300}
                        height={300}
                        layout="intrinsic"
                        alt={facet.text}
                      />
                      <span className="collectionText">{facet.text}</span>
                    </div>
                  );
                })}
            </DynamicCarousel>
          ) : (
            renderPlaceholderCards()
          )}
        </div>
      </div>
    );
  };

  const renderCollections = () => {
    let cids = Object.keys(collectionsState);
    for (let cid of cids) {
      const collectionsOfCid = collectionsState[cid];
      const { loading, cat, URL } = collectionsOfCid;
      if (
        collectionsOfCid &&
        collectionsOfCid[2] &&
        collectionsOfCid[2].facets &&
        collectionsOfCid[2].facets[2] &&
        collectionsOfCid[2].facets[2].Other
      ) {
        let otherFacets =
          collectionsOfCid[2].facets[2] && collectionsOfCid[2].facets[2].Other;

        let collectionsFacets = otherFacets.find(
          facet => facet.name === "Collections"
        );

        if (collectionsFacets && collectionsFacets.facetValues) {
          return renderCollectionCards(loading, collectionsFacets, cat, URL);
        }
      }
    }
  };

  return (
    <Wrapper>
      <div>
        <div>{renderCollections()}</div>
      </div>
    </Wrapper>
  );
}

export default Collections;
