import React from "react";
import styled from "styled-components";
import Translate from "../../utils/Translate";

const FinePrint = () => {
  const year = new Date().getFullYear();

  return (
    <Wrapper>
      <small>
        <Translate
          translationFileName={"translation"}
          translateKey={"footer.copyright"}
          replaceText={text => text.replace("$YEAR", year)}
        />
      </small>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 5%;
  background: #FFF0EE;
  text-align: center;
  color: #212B36;
`;

export default FinePrint;
