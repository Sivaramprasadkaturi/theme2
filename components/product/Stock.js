import styled from "styled-components";

const Stock = () => {
  return (
    <Wrapper>
      <span>1000&nbsp;</span> in Stock Nationally,
      <span>&nbsp;0&nbsp;</span> Locally,
      <span>&nbsp;1&nbsp;</span> on Display
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--text-color);
  display: flex;
  margin: 20px 0 30px;
  span {
    color: var(--primary-color);
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    border-bottom: 1px solid #c2c2c2;
    padding-bottom: 10px;
    display: block;
    line-height: 1.5em;
    font-size: 12px;
  }
`;

export default Stock;
