import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import Link from "next/link";
import { PROJECT_LINK } from "../../preScripts/links";
import HamburgerMenu from "../category/HamburgerMenu";
import ItemCard from "../shared-components/ItemCard";

const FeaturedProducts = ({ items }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <Wrapper>
      <div className="heading h-fit" style={{ height: 70 }}>
        <h1 className="title">
          <span>featured </span>Items
        </h1>
      </div>
      <div>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          // showDots={true}
          customLeftArrow={
            <Button>
              <MdKeyboardArrowLeft
                style={{
                  fontSize: "3.6em",
                  background: "rgba(255,255,255,0.4)",
                  border: "1px solid white"
                }}
              />
            </Button>
          }
          customRightArrow={
            <Button style={{ right: "calc(0%)" }}>
              <MdKeyboardArrowRight
                style={{
                  fontSize: "3.6em",
                  background: "rgba(255,255,255,0.4)",
                  border: "1px solid white"
                }}
              />
            </Button>
          }
        >
          {items &&
            items.map(item => (
              <ItemCard key={item.id} item={item} hasBorder={false} />
            ))}
        </Carousel>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: -60px;
  .heading {
    
    font-weight: 700;

    padding: 20px;
    background: #333;
    margin-top: -46px;
    color: #fff;
  }
  .title {
    font-size: 1.9em;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 400;

    span {
      color: rgb(254, 79, 0);
    }
  }
`;

const Item = styled.div`
  padding-top: 20px;

  height: 400;
  height: 400;
  /* background-color: #eee; */
  /* padding: 30px; */
  .inner {
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: none;
    a {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      display: inline-block;
      img {
        aspect-ratio: attr(width) / attr(height);
        width: 90%;
      }
    }
    .dots {
      margin-top: 20px;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 2;
  border: 0;
  background: transparent;
  min-width: 43px;
  min-height: 43px;
  opacity: 1;
  cursor: pointer;
`;

export default FeaturedProducts;
