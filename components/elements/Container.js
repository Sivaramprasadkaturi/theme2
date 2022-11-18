import styled from "styled-components";

const Wrapper = styled.div`
  // width: 90%;
  width: 100%;
  margin: 0 auto;
  height: 100%;

  @media only screen and (min-width: 1440px) {
    width: 1280px;
  }
`;

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
