import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";

export default function Custom404() {
  return (
    <div className="wrapper-404">
      <div className="background">
        <h1>404 </h1>
        <p>Page Not Found</p>
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "1em",
          marginTop: "1em",
          padding: "2em"
        }}
      >
        Sorry, we can&apos;t find the page you are looking for. Use the search
        bar or the browse catalogues menu to find the page your are looking for.
      </p>
    </div>
  );
}

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
