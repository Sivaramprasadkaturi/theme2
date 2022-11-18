import styled from "styled-components";

const QuickSpecs = () => {
  return (
    <Wrapper>
      {/* TODO review h tag */}
      <h4 className="title">Quick Specs</h4>
      <div className="quickSpecsList">
        <div className="specWrapper">
          <span className="specname">Measurements: </span>
          <span className="specvalue">L21.7&quot; x H4.7&quot; x E3&quot;</span>
        </div>
        <div className="specWrapper">
          <span className="specname">Lamping: </span>
          <span className="specvalue">Integrated LED</span>
        </div>
        <div className="specWrapper">
          <span className="specname">Installed Weight: </span>
          <span className="specvalue">3.31 LB</span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 15px;
  padding-bottom: 5px;
  .quickSpecsList {
    margin: 20px 0px;
  }
  .title {
    margin-top: 15px;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    text-transform: uppercase;
  }
  .specWrapper {
    display: flex;
    padding: 10px;
    font-size: 12px;
    color: #333;
  }
  .specWrapper:nth-child(4n + 1),
  .specWrapper:nth-child(4n + 3) {
    background-color: #f0f0f0;
  }
  .specname {
    padding: 5px 0;
    text-transform: capitalize;
    font-weight: 700;
  }
  .specvalue {
    padding: 5px 0 5px 5px;
  }
`;

export default QuickSpecs;
