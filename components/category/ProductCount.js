import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Wrapper = styled.span`
  color: #555;
`;

export default function ProductCount({ productCount = 0 }) {
  const { t } = useTranslation("translation");
  const productCountState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );
  console.log("productCountState", productCountState, productCount);
  if (typeof productCountState !== "undefined" || productCount) {
    let count = productCountState || productCount;

    if (productCountState === 0) {
      count = 0;
    }
    return (
      <Wrapper>
        <strong style={{color: "#37455E"}}>{count}</strong>&nbsp;
        {t(
          count > 0 ? "js.category.productsfound" : "js.category.productfound"
        )}
      </Wrapper>
    );
  }

  return <span></span>;
}
