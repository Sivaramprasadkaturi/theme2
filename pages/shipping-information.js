import React from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import { useTranslation } from "next-i18next";

const ShippingInformation = () => {
  const { t } = useTranslation("translation");
  return (
    <Wrapper>
      <Head>
        <title>Shipping Information</title>
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
          Each Seller on the Starter Marketplace will choose to either offer
        </p>
        <ol>
          <li>
            Curbside pickup at their store or a farmers market or other location
          </li>
          <li>They will ship to you using a carrier they choose.</li>
        </ol>
        <p>
          When you place an order you will receive an order confirmation email
          that confirms where to pickup your order or advises that the order
          will be shipped.
        </p>
        <p>
          When the order has been shipped or is ready for pickup you will
          receive a second order shipping or pickup confirmation email. Do not
          travel to the sellers store until you receive the email that advises
          the order is ready for pickup.
        </p>
        <p>
          If the order is shipped a tracking number may be included in the
          shipping confirmation email that you can click on to track your order.
        </p>
        <p>
          You can also contact the seller directly to confirm delivery or pickup
          status.
        </p>
        <p>
          If you have any questions about our policies please contact us in the
          contact us section of the Starter Marketplace site.
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

export default ShippingInformation;
