import Image from "next/image";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { PROJECT_LINK } from "../../preScripts/links";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
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

const ProductFamily = ({ products }) => {
  const [showInfo, setShowInfo] = useState(false);

  if (products.length > 0)
    return (
      <Wrapper>
        <h2 className="flex items-center justify-between w-full px-4 py-4 mt-0 font-medium uppercase border border-gray-300 md:mt-5 md:px-0 md:border-none md:bg-white">
          {" "}
          more from this family
          <span
            className="text-2xl text-main-orange md:hidden flex cursor-pointer"
            onClick={e => setShowInfo(!showInfo)}
          >
            {showInfo ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </span>
        </h2>{" "}
        <div
          className={`content w-full ${
            showInfo ? "hidden" : ""
          } border border-gray-300 md:block specs md:border-none`}
        >
          {" "}
          {products.map((family, i) => {
            return (
              <div
                style={{ width: "100%" }}
                className="innerContent mt-8"
                key={i}
              >
                <h3>{family.familyName}</h3>
                <div style={{ maxWidth: "100%" }}>
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
                    {family.products.map((product, i) => {
                      return (
                        // <div
                        //   style={{ height: "100%", background: "blue" }}
                        //   key={i}
                        // >
                        //   Hello
                        // </div>
                        <Item key={i}>
                          <div>
                            <Link href={`/${product.seourl}`}>
                              <a>
                                <Image
                                  src={`${
                                    process.env.NEXT_PUBLIC_IMAGEKIT
                                  }/store/${product.thumb.replace(
                                    "thumbnails",
                                    "largeimages"
                                  )}?q-90,w-200,h-200`}
                                  alt={product.name}
                                  layout="responsive"
                                  width="200"
                                  height="200"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="info">
                            <p className="title">{product.name}</p>
                            <p className="price">
                              ${parseFloat(product.price).toFixed(2)}
                              {/* <span></span> */}
                            </p>
                          </div>
                        </Item>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </Wrapper>
    );
  else return null;
};

const Wrapper = styled.section`
  h2 {
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    color: #333;
    font-size: 18px;
  }
  h3 {
    letter-spacing: 0.5px;
    display: block;
    color: var(--secondary-color);
    margin: 20px 0 20px 0;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
  }
  /* li {
    margin-right: 10px;
  } */
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 16px;
      border-top: none;
      background-color: #f7f7f7;
      border-bottom: none;
    }
    h3 {
      margin-top: 10px;
    }
    .content {
      padding: 1rem;
      border-bottom: none;
    }
    .innerContent {
      margin-top: 0px !important;
    }
    ul {
      margin-bottom: 20px;
    }
  }
`;

const Item = styled.div`
  margin-right: 30px;
  img {
    width: 100%;
  }
  .info {
    margin-top: 10px;
    .title {
      color: #333;
      font-size: 12px;
      padding-left: 0;
      text-align: center;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      text-align: center;
      color: #fe560a;
      font-size: 14px;
      margin-bottom: 0;
      font-weight: 500;
      /* padding-bottom: 20px; */
      padding-top: 10px;
      position: relative;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 1000;
  border: 0;
  background: transparent;
  min-width: 43px;
  min-height: 43px;
  opacity: 1;
  cursor: pointer;
`;

export default ProductFamily;
