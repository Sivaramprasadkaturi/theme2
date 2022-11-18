import React from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import { useTranslation } from "next-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation("translation");
  return (
    <Wrapper>
      <Head>
        <title>Terms of Use</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta property="og:url" content={LINK_DISTRIBUTION} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="row staticContent">
        <h1>{t("footer.shippinginfo")}</h1>
        <p>
          You can use this site to search the catalogs of Sellers on the
          platform to find products to purchase. Accessing the site in methods
          that implement denial of service attacks or in any other malicious way
          is not permitted. Information on this site cannot be scraped to resold
          or given to other platforms.
        </p>

        <p>
          All product content on this site is from the Sellers and the sellers
          are responsible for the accuracy of the prices and content they
          provide. All other content is Copyright Avetti.com Corporation.
        </p>

        <p>
          You can rate sellers on our site and the Starter Marketplace may
          decide not to post or remove your review if the content is not
          appropriate, or respectful or for any reason. Sellers that attempt to
          rate themselves may be banned from the site.
        </p>

        <p>
          For all products are listed shoppers can transact an offer to
          purchase. The seller can accept or decline the offer. Some products
          will be sold via credit card payment and this may be to the sellers
          credit card payment processor. If pricing or product information on
          the site is incorrect a seller may decline an order.
        </p>

        <p>
          Sellers cannot post products that are illegal or inappropriate to the
          categories on the site. The Starter Marketplace may remove any listing
          at any time and ban any seller at any time for any reason.
        </p>

        <p>
          We may provide links to the Sellers own website. We are not
          responsible for any content linked from our site or data or images
          seller upload.
        </p>

        <p>
          If you see content that is inappropriate or if you have any questions
          about our policies please contact us in the contact us section of the
          Starter Marketplace site.
        </p>
      </div>
    </Wrapper>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      ))
    }
  };
};

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;

  .staticContent h1 {
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
    margin: 20px 0px;
  }
  .staticContent p {
    font-size: 14px;
    margin: 20px 0px;
    line-height: 21px;
    font-weight: 500;
    text-align: justify;
  }

  .row.staticContent {
    width: 70%;
    min-height: calc(100vh - 390px);
  }

  .row.staticContent h1 {
    margin-bottom: 40px;
  }

  .row.staticContent ul li {
    list-style-type: disc;
    margin-left: 40px;
    line-height: 1.8em;
    font-weight: 500;
  }

  .row.staticContent ol li {
    list-style-type: number;
    margin-left: 40px;
    line-height: 1.8em;
    font-weight: 500;
  }
`;

export default TermsOfUse;
