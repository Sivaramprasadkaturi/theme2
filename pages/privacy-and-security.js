import React from "react";
import Head from "next/head";
import { LINK_DISTRIBUTION } from "../project-config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";

const PrivacyAndSecurity = () => {
  return (
    <>
      <Head>
        <title>Privacy And Security</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta
          property="og:url"
          content={LINK_DISTRIBUTION + "/privacy-and-security"}
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div>
        <h1>Privacy and Security</h1>
      </div>
    </>
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

export default PrivacyAndSecurity;
