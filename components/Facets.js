import React from "react";
import { MdStar, MdStarBorder } from "react-icons/md";
import styled from "styled-components";
import menuData from "../preBuildData/menu/menu.json";
import Link from "next/link";

const Wrapper = styled.div`
  justify-content: center;
  margin-top: 100px;
  //margin-left: 50px;

  h4 {
    font-weight: 600;
  }

  hr {
    margin-bottom: 30px;
    margin-top: 30px;
    border-bottom: 1px solid #eee;
    width: 100%;
  }

  .delivery-facet {
    border: 1px solid;
    padding: 5px;
    margin: 10px;
    font-size: 14px;
  }

  .clearBtn {
    float: right;
    font-size: 14px;
    color: orange;
  }

  .color-dots {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
  }

  li {
    margin: 10px;
  }

  .stars {
    color: orange;
    font-size: 1rem;
    display: inline-block;
    margin-right: 30px;
  }

  .distanceCheck {
    display: block;
  }

  input {
    margin-top: 10px;
    height: 20px;
    margin-right: 15px;
    width: 30px;
  }

  .viewBtn {
    color: var(--primary);
    display: inline-block;
    border: 1px solid var(--primary);
    font-size: 14px;
    padding: 10px;
    //margin-top:10px;
  }

  .storeInfo {
    flex: 1;
  }

  p {
    font-size: 16px;
  }
`;

const Facets = () => {
  let subCats = menuData.childs.filter(cat => !cat.URL.includes("stores"));

  const renderSubCategory = () => {
    return (
      <>
        <div className="navlink-sub-categories">
          {subCats[0].childs
            .filter(cat => cat.childs.length > 0)
            .map(cat => {
              let catName = cat.name;
              let className = `navlink-nodropdown subcat-link`;
              if (cat && cat.childs && cat.childs.length > 0) {
                className = `navlink-withdropdown subcat-link`;
              }
              // let tempUrl = cat.URL.replace("shop/", "");
              return (
                <div key={cat.cid} className={"mt-5 font-semibold"}>
                  <Link href={`/${cat.URL}`}>
                    <a style={{ color: "#2D4660" }}>{catName}</a>
                  </Link>
                  <span style={{ float: "right", color: "#999" }}>
                    {cat.childs.length}
                  </span>
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <Wrapper className="basis-1/4 ml-5 md:ml-10 ">
      <h3 className="text-lg lg:text-2xl">Filters</h3>
      <hr />
      {renderSubCategory()}
      <hr />
      <h4 className="text-base md:text-md lg:text-2xl">
        Delivery or Pick Up <span className="clearBtn">Clear</span>
      </h4>
      <div className="flex flex-wrap space-evenly">
        {/*<span className="delivery-facet">Test Delivery</span>*/}
        <span className="delivery-facet">Pick up</span>
        <span className="delivery-facet">Same day pick up</span>
        <span className="delivery-facet">Delivery</span>
        <span className="delivery-facet">Same day pick Delivery</span>
        <span className="delivery-facet">Free delivery</span>
      </div>
      <hr />
      <h4 className="text-base text-md lg:text-2xl">
        Size <span className="clearBtn">Clear</span>
      </h4>
      <div className="flex space-evenly m-0 md:m-2">
        <span className="delivery-facet">XS</span>
        <span className="delivery-facet">S</span>
        <span className="delivery-facet">M</span>
        <span className="delivery-facet">L</span>
        <span className="delivery-facet">XL</span>
      </div>
      <hr />
      <h4 className="text-base text-md lg:text-2xl">
        Color <span className="clearBtn">Clear</span>
      </h4>
      <div>
        <span className="color-dots" style={{ backgroundColor: "teal" }}></span>
        <span className="color-dots" style={{ backgroundColor: "navy" }}></span>
        <span
          className="color-dots"
          style={{ backgroundColor: "purple" }}
        ></span>
        <span
          className="color-dots"
          style={{ backgroundColor: "salmon" }}
        ></span>
        <span className="color-dots"></span>
        {/*<span className="color-dots"></span>*/}
      </div>
      <hr />
      <h4 className="text-base text-md lg:text-2xl">
        Store Rating <span className="clearBtn">Clear</span>
      </h4>
      <div>
        <div className="stars">
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <span style={{ color: "black" }}> and up</span>
        </div>
        <div className="stars">
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <span style={{ color: "black" }}> and up</span>
        </div>
        <div className="stars">
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <span style={{ color: "black" }}> and up</span>
        </div>
        <div className="stars">
          <MdStar style={{ display: "inline-block", marginRight: "5px" }} />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <MdStarBorder
            style={{ display: "inline-block", marginRight: "5px" }}
          />
          <span style={{ color: "black" }}> and up</span>
        </div>
      </div>
      <hr />
      <h4 className="text-base text-md lg:text-2xl">
        Distance <span className="clearBtn">Clear</span>
      </h4>
      <div>
        <span className="distanceCheck">
          <input type="checkbox" name="under6" />
          Under 6 miles
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="6to15" />6 to 15 miles
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="15to30" />
          15 to 30 miles
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="30plus" />
          Over 30 miles
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="samecity" />
          Same city
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="samestate" />
          Same state
        </span>
        <span className="distanceCheck">
          <input type="checkbox" name="samecountry" />
          Same country
        </span>
      </div>
    </Wrapper>
  );
};

export default Facets;
