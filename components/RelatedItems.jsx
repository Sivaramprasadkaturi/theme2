import React from "react";
import classes from "./RelatedItems.module.css";
import Image from "next/image";

import dynamic from "next/dynamic";
import styled from "styled-components";
import ItemCard from "./shared-components/ItemCard";
const DynamicCarousel = dynamic(() =>
  import("../components/uiElements/Carousel/Carousel")
);

function RelatedItems({ items, properties }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 4
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

  const Wrapper = styled.div`
    .relatedCard {
      margin: 0 10px;
      border: 1px solid #c8c8c8;
      min-height: 200px;
      position: relative;
      cursor: pointer;
      height: 100%;
    }

    .relatedCard span {
      width: 100% !important;
      height: 100% !important;
    }

    .relatedCard img {
      object-fit: cover !important;
    }
    & > h1 {
      font-size: 20px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .relatedCardImg {
      width: 100%;
      position: absolute;
      height: 100%;
      object-fit: cover;
    }

    .relatedCard .relatedText {
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

  if (items && items.length === 0) {
    return null;
  }
  console.log("items", items);

  return (
    <div className={classes.container}>
      <Wrapper>
        <h1 className="likelytobeitems">You Might also Like</h1>
        <DynamicCarousel
          autoPlaySpeed={3000}
          autoPlay={false}
          infinite={true}
          responsive={responsive}
          showArrows={true}
          ssr={false}
        >
          {items.map((item, idx) => {
            return (
              <ItemCard
                item={item}
                key={idx}
                relatedItemProp={properties}
                relatedItem={true}
              >
                {/* <h3 className="relatedText">{title}</h3>
                <Image
                  className="relatedCardImg"
                  width={300}
                  height={300}
                  layout="intrinsic"
                  src={`${cimage}?tr=w-300,h-300,cm-pad_resize,bg-FFFFFF, q-80`}
                  placeholder="blur"
                  blurDataURL={`${cimage}?tr=w-30,h-30,cm-pad_resize,bg-FFFFFF, q-60`}
                  alt={title}
                />
                <span className="relatedText">Price</span> */}
              </ItemCard>
            );
          })}
        </DynamicCarousel>
      </Wrapper>
    </div>
  );
}

export default RelatedItems;
