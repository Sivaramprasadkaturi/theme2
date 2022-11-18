import styled from "styled-components";
import {
  MdLocationOn,
  MdAccessTimeFilled,
  MdPhone,
  MdLanguage
} from "react-icons/md";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 40px;

  @media (max-width: 1023px) {
    grid-template-columns: auto;
  }

  h2 {
    font-weight: 700;
  }
  h3 {
    color: var(--black);
  }
  p {
    margin-top: 2em;
    line-height: 22px;
  }
  .about {
    border-top: 2px solid #c4c4c4;
    padding-top: 60px;
  }
  .infoWrapper {
    margin-top: 40px;
  }
  .icon {
    color: var(--primary);
    font-size: 18px;
    margin-right: 10px;
    margin-top: 5px;
  }
  .info {
    font-size: 16px;
    color: var(--black);
    line-height: 22px;
  }
  .timeGrid {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 26px;
  }
`;

const StoreAboutInfo = () => {
  return (
    <Wrapper className="grid grid-cols-3">
      <div>
        <h2>Information</h2>
        <div className="infoWrapper">
          <div className="flex">
            <MdLocationOn className="icon" />
            <div className="flex flex-col">
              <div className="info">865 Market St Space C41</div>
              <div className="info">San Francisco, CA 94103, USA</div>
            </div>
          </div>
          <div className="flex mt-6">
            <MdAccessTimeFilled className="icon" />
            <div className="timeGrid">
              <div className="info">Monday</div>
              <div className="info">8am-6pm</div>
              <div className="info">Tuesday</div>
              <div className="info">8am-6pm</div>
              <div className="info">Wednesday</div>
              <div className="info">8am-6pm</div>
              <div className="info">Thursday</div>
              <div className="info">8am-6pm</div>
              <div className="info">Friday</div>
              <div className="info">8am-6pm</div>
              <div className="info">Saturday</div>
              <div className="info">8am-12pm</div>
              <div className="info">Sunday</div>
              <div className="info">closed</div>
            </div>
          </div>
          <div className="flex mt-6">
            <MdPhone className="icon" />
            <div className="flex flex-col">
              <div className="info">(555) 555-5555</div>
            </div>
          </div>
          <div className="flex mt-6">
            <MdLanguage className="icon" />
            <div className="flex flex-col">
              <div className="info">
                <a
                  href="http://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.google.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about">
        <h3>About Store</h3>
        <p className="info">
          Tortor malesuada. Vestibulum porta pellentesque bibendum. In
          consequat, massa sit amet euismod consequat, lectus augue vehicula
          odio, nec laoreet purus orci sit amet neque
        </p>
        <p className="info">
          In consequat, massa sit amet euismod consequat, lectus augue vehicula
          odio, nec laoreet purus orci sit amet neque. Tortor malesuada.
          Vestibulum porta pellentesque bibendum.
        </p>
        <p className="info">
          In consequat, massa sit amet euismod consequat, lectus augue vehicula
          odio, nec laoreet purus orci sit amet neque.
        </p>
      </div>
    </Wrapper>
  );
};

export default StoreAboutInfo;
