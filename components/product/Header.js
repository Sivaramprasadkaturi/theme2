import styled from "styled-components";
import Link from "next/link";

const MobileHeader = ({ props, hiddenProps, title }) => {
  const family = hiddenProps.find(prop => {
    return prop.propname === "temp_Family";
  });
  const brand = hiddenProps.find(prop => {
    return prop.propname === "facet_Brand";
  });
  const style = props.find(prop => {
    return prop.propname === "temp_Fixture_Style";
  });
  const designer = props.find(prop => {
    return prop.propname === "temp_Designer_Name";
  });

  return (
    <Wrapper className="md:0">
      <div className="title">{title}</div>
      <div className="family">{family && family.propvalue}</div>
      <div className="infoWrapper">
        <div className="">
          {brand && brand.propvalue && brand.propvalue !== "" && (
            <span>
              By:{" "}
              <Link
                href={`/shop/by-brand/${brand.propvalue.replace(" ", "-")}`}
              >
                <a target="_blank">
                  <span className="">{brand.propvalue}</span>
                </a>
              </Link>
            </span>
          )}

          {designer && designer.propvalue && designer.propvalue !== "" && (
            <span>
              {" "}
              | Designed by: <span className="">{designer.propvalue}</span>
            </span>
          )}
        </div>
        <div className="">
          {style && style.propvalue && style.propvalue !== "" && (
            <span>
              Style:{" "}
              <Link href="/shop/by-Style/Contemporary-Lighting/">
                <a target="_blank">
                  <span className="">{style.propvalue}</span>
                </a>
              </Link>
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .title {
    font-size: 12px;
    color: var(--primary-color);
    margin-bottom: 6px;
  }

  .family {
    font-size: 24px;
    color: var(--text-color);
  }

  .infoWrapper {
    padding: 10px;
    background: #f7f7f7;
    display: block;
    margin-top: 15px;

    div {
      margin: 10px 0;
      width: auto;
      font-size: 12px;
      font-style: italic;
      letter-spacing: 0.05em;
      color: var(--text-color-light);
    }
  }
`;

export default MobileHeader;
