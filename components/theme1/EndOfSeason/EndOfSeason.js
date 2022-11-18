import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./NewEndOfSeason.module.css";
import styled from "styled-components";


const Wrapper = styled.main`
  .EndOfSeasonBanner{
    background: url("https://ik.imagekit.io/ofb/themes/AdobeStock_232118132_T5Nn1COeD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052322394") !important;
  }

`;

const HomeBanner = () => {
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      <div className={classes.EndOfSeason}>
        <div className={classes.EndOfSeasonInner}>
          <div className={classes.EndOfSeasonBanner}>
            {/* <h1>End of Season upto to 70% off</h1>
            <h6>Be the first to shop the drop</h6> */}
            <button>Select Your Style</button>
          </div>
        </div>
      </div>


    </>
  );
};

export default HomeBanner;
