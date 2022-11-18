import React, { useState } from "react";
import htmldecoder from "../../utils/htmlDecoder";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

const Wrapper = styled.div`
  .product-details-specs-container {
    margin-bottom: 20px;
  }

  .product-details-specs-container h3 {
    padding-bottom: 12px;
    margin-top: 50px;
    font-size: 20px;
    border-bottom: 1px solid #cdcd;
  }

  p.activeItemTab {
    border-bottom: 2px solid #f50057;
  }
`;

function AboutItem({ description, properties }) {
  console.log("description", description);
  console.log("properties", properties);

  const { t } = useTranslation("translation");

  const [currentSection, setCurrentSection] = useState(0);
  const RenderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <p
            className="text-[12px] lg:text-[16px] p-3"
            dangerouslySetInnerHTML={{
              __html: description
                ? description
                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi consequuntur id impedit magni mollitia nostrum optio saepe soluta velit?"
            }}
          ></p>
        );
      case 1:
        return (
          <div>
            {properties ? (
              properties.map((prop, i) => (
                <p key={i} className="text-[12px] lg:text-[16px] ml-3">
                  <span className="font-bold">{prop.propdesc}</span> :{" "}
                  {prop.propvalue}
                </p>
              ))
            ) : (
              <p className="text-[12px] lg:text-[16px]">
                There is no Specifications to show
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <p className="text-[12px] lg:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
            assumenda atque cum cupiditate laboriosam nulla odio odit pariatur
            totam!
          </p>
        );
      default:
        return <p>Something went wrong...</p>;
    }
  };
  return (
    <div className="w-full h-full flex my-6">
      <div className="flex flex-col w-full" style={{borderTop: "3px solid #F3F3F3",
    marginTop: "-20px",
    width: "98%"}}>
        <div className="flex items-center ml-5">
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 0
                ? "text-[#000] lg:text-[20px] md:text-[16px] font-bold mr-10 cursor-pointer itemTab activeItemTab"
                : "text-[#000] lg:text-[20px] md:text-[16px] font-bold mr-10 cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(0)}
          >
            {/* {t("items.about")} */}
          </p>
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 1
                ? "text-[#000] lg:text-[20px] md:text-[16px] font-bold mr-10 cursor-pointer itemTab activeItemTab"
                : "text-[#000] lg:text-[20px] md:text-[16px] font-bold mr-10 cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(1)}
          >
            {/* {t("items.specs")} */}
          </p>
        </div>
        <div className="my-5 ml-2 leading-loose" style={{marginLeft: "0.5rem"}}>
          <RenderCurrentSection />
        </div>
      </div>
    </div>
  );
}

const OtherInfoTab = ({ longDesc, properties, hiddenProps }) => {
  const { t } = useTranslation("translation");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Wrapper>
      {/* <div className="topnav999">
          <a className="active" href="#description">
            Description
          </a>
          <a href="#additionalinfo">Additional-info</a>
          <a href="#reviews">Reviews</a>
          <a href="#othercontent">Other-content</a>
          <a href="#comments">Comments</a>
        </div> */}



      <div
        className="product-details-specs-container"
        style={{ backgroundColor: "white" }}
      >
        {/* <h3 className="products-desc pt-5">
          <span className="ml-5 mt-5">{t("product.productDescription")}</span>
        </h3> */}
        <AboutItem description={longDesc} properties={properties} />
      </div>
    </Wrapper>
  );
};

export default OtherInfoTab;
