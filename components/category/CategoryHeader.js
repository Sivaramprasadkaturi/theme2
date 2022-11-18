import React from "react";
import Link from "next/link";
import { htmlDecode } from "../../utils/htmlDecoder";
import styled from "styled-components";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
import { LINK_DISTRIBUTION } from "../../project-config";
import Head from "next/head";
import {Fade} from "react-awesome-reveal";
// import { SortBy} from "./SortBy"

const Wrapper = styled.div`
  .sub-nav-wrapper {
    // background: url("https://ik.imagekit.io/ofb/themes/Mask_Group_5_qByvx6kru.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665383991372") !important;
    /* background-size: cover !important; */
    background-position-x: right !important;
    background-position-y: top !important;
    background-repeat: no-repeat !important;
  }

  

  .sub-nav-menu {
    // height: 420px;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin: 0 auto;
    color: #000;
    display: inline-flex;
    width: 100%;
    padding: 0px 0 0px 0;
    position: relative;
    flex-direction: row;
  }

  .sub-nav-title-desc-wrapper {
    display: flex;
    // width: 90%;
    // margin: 0 auto;
    // margin: 0 -37px;
  }
  

  .sub-nav-menu-title {
    margin: 0;
    line-height: initial;
    font-size: 40px;
    text-transform: capitalize;
    letter-spacing: normal;
    padding-left: 0px;
    letter-spacing: 0px;
    color: #212B36;
    opacity: 1;
    font-weight: 500;
  }

  // @media only screen and (max-width: 768px) {
  //   background: url("https://ik.imagekit.io/ofb/themes/Mask_Group_5_qByvx6kru.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665383991372") !important;
  // }

  @media only screen and (min-width: 431px){
    .bred{
    display: flex;
    margin: 6px -155px 0px -298px;
    marginTop: 6px;
    padding: 10px 0px !important;
    }
  }

  .sub-nav-title-desc-wrapper p{
    width: 50%;
    text-align: left;
    letter-spacing: 0px;
    // color: #212B36;
    opacity: 1;
    margin-top: 10px;
    color: #37455E;
}
`;

const CategoryHeader = ({ data }) => {
  console.log("CategoryHeader", data);
  return (
    <Wrapper className="bredtopgap">
      <Fade>
      <div
        className="sub-nav-wrapper"
        style={{
          width: "100%",
          marginBottom: "30px"
        }}
      >
        <div className="bred" 
    //     style={{display: "flex",
    // margin: "6px -155px 0px -298px",
    // marginTop: "6px", padding: "10px 0px !important"}}
    >
          <div className="bredcrumbcolor"><Link href={"/"}><a>Home</a></Link> / {data.description}</div>
          <div style={{display:"flex"}} className="item-row-picker">
            <div className="item-row-picker9">
            <img src="https://ik.imagekit.io/ofb/themes/Component_19___80_ImWnW3KJ1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667534859522"/>
            </div>
            <div className="item-row-picker9">
            <img src="https://ik.imagekit.io/ofb/themes/Component_30___9_op5XurF2g1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667534815522"/>
            </div>
            <div className="item-row-picker9">
            <img src="https://ik.imagekit.io/ofb/themes/Component_31___9_UafMpyAKh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667534859618"/>
            </div>
            <div className="item-row-picker9">
            <img src="https://ik.imagekit.io/ofb/themes/Component_85___5_XeI_-sN9d.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667534859658"/>
            </div>

          </div>
        </div>
        <div className="sub-nav-menu">
          <div className="sub-nav-title-desc-wrapper">
            <div>


              <div className="sub-nav-menu-titlemb">
              
                <h2
                  style={{ backgroundColor: "transparent" }}
                  className="sub-nav-menu-title"
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(data.description)
                  }}
                />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
               
              </div>


            </div>

          </div>
        </div>



        {/* <CategoryBreadcrumb /> */}
      </div>
      </Fade>
    </Wrapper>
  );
};

export default CategoryHeader;
