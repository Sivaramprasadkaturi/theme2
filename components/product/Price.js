import { useMemo } from "react";

import styled from "styled-components";

const Price = ({ calculatedPriceAndFoundDist }) => {
  const price = useMemo(() => {
    if (calculatedPriceAndFoundDist && calculatedPriceAndFoundDist.price) {
      return calculatedPriceAndFoundDist.price.price_1;
    }
    return null;
  }, [calculatedPriceAndFoundDist]);

  if (calculatedPriceAndFoundDist && calculatedPriceAndFoundDist.price)
    return (
      <Wrapper className="">
        {calculatedPriceAndFoundDist.price.listprice >
        calculatedPriceAndFoundDist.price.price_1 ? (
          <span
            style={{
              fontSize: "14px",
              fontFamily: "'sqr721ext', sans-serif",
              color: "#888",
              textDecoration: "line-through",
              marginBottom: "5px",
              display: "block"
            }}
          >
            $ {calculatedPriceAndFoundDist.price.listprice.toFixed(2)}
          </span>
        ) : null}
        <span className="dollars">
          <span className="currency">$</span>
          <span className="integer"> {price ? Math.floor(price) : null}</span>
          <span className="dot">
            .
            <span>
              <span className="decimals">
                {price ? price.toFixed(2).toString().split(".")[1] : null}
              </span>
            </span>
          </span>
          <sub className="each">each</sub>
        </span>
      </Wrapper>
    );
  else return null;
};

const Wrapper = styled.div`
  margin: 40px 0 30px;
  font-size: 25px;
  
  color: var(--text-color);
  .currency {
    grid-row: 1 / 3;
    place-self: self-start end;
    font-size: 14px;
    vertical-align: top;
  }
  .integer {
    grid-row: 1 / 3;
    align-self: center;
    font-size: 25px;
  }
  .dot {
    white-space: nowrap;
    align-self: self-end;
    font-size: 17px;
    vertical-align: top;
  }
  .each {
    font-size: 12px;
    position: relative;
    place-self: center right;
    margin-left: -32px;
  }

  @media screen and (max-width: 768px) {
    margin: 30px 0;
  }
`;

export default Price;
