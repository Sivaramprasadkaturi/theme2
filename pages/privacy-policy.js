import React from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import { useTranslation } from "next-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("translation");
  return (
    <Wrapper>
      <Head>
        <title>Privacy Policy</title>
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
        <h1>{t("footer.privacypolicy")}</h1>
        <p>
          We will not sell your email address, name and personal information to
          any third party. We ask all Sellers on the Starter Marketplace to
          abide by the same policy.
        </p>

        <p>
          We will not send unsolicited emails to you. The only exception may be
          emails you agree to receive when you register on the site. All emails
          from the Starter Marketplace are transactional or due to activity on
          the site such as abandoning a basket.
        </p>

        <p>
          If you find that a Seller is sending unsolicited emails you have not
          agreed to receive advise the Seller and advise us as this is contrary
          to our agreement with Sellers.
        </p>

        <h1>{t("text.licenseAndAttribution")}</h1>
        <p>
          All content used in the design and development of the company website
          adheres to the below-mentioned license policies:{" "}
        </p>
        <p>
          Subscription: Icons sourced from{" "}
          <a
            style={{ color: "blue" }}
            href="https://www.flaticon.com"
            target="_blank"
            rel="noreferrer"
          >
            www.flaticon.com
          </a>{" "}
          under Premium license. Images sourced from{" "}
          <a
            style={{ color: "blue" }}
            href="https://www.stock.adobe.com"
            target="_blank"
            rel="noreferrer"
          >
            www.stock.adobe.com
          </a>{" "}
          under Standard license. For more details on icons sourcing and
          attribution request detailed attribution document at{" "}
          <a
            style={{ color: "blue" }}
            href="https://docs.google.com/spreadsheets/d/1Ed-XripV7dbPbkCUdgRCh2lDeqzXPZu2tCZbIMg4NtE/edit#gid=1378801553"
            target="_blank"
            rel="noreferrer"
          >
            attribution details
          </a>
          .
        </p>

        <p>
          If you have any questions about our policies please contact us in the
          contact us section of the Starter Marketplace site.
        </p>
      </div>
    </Wrapper>
  );
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

export default PrivacyPolicy;
