import styled from "styled-components";
import encodeConverter from "../../utils/htmlDecoder";

const Wrapper = styled.div`
  h2 {
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    text-transform: uppercase;
    margin-top: 20px;
    font-weight: 500;
    color: #333;
    font-size: 18px;
    line-height: 80px;
  }
  p,
  div {
    line-height: 1.5em;
    margin-bottom: 25px;
    font-weight: 400;
  }
  ul {
    margin-bottom: 25px;
    padding-left: 25px;
  }
  li {
    list-style: disc;
    margin-bottom: 5px;
  }
`;

const Description = ({ desc }) => {
  return desc ? (
    <Wrapper>
      <h2>PRODUCT DESCRIPTION</h2>
      {/* <div>{encodeConverter(desc)}</div> */}
      <div dangerouslySetInnerHTML={{ __html: desc }} />
    </Wrapper>
  ) : null;
};

export default Description;
