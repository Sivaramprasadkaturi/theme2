import styled from "styled-components";
import { MdChevronRight } from "react-icons/md";

const QuickScroll = ({
  specsRef,
  familyRef,
  showroomsRef,
  reviewsRef,
  family,
  products
}) => {
  const executeScroll = el => {
    el.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <Wrapper className="hidden md:block">
      <div className="scrollTo" onClick={() => executeScroll(specsRef)}>
        <div>Specs & Details</div>
        <MdChevronRight />
      </div>

      {products?.length > 0 && (
        <div className="scrollTo" onClick={() => executeScroll(familyRef)}>
          <div>More from {family.propvalue} collection</div>
          <MdChevronRight />
        </div>
      )}

      <div className="scrollTo" onClick={() => executeScroll(showroomsRef)}>
        <div>Showrooms</div>
        <MdChevronRight />
      </div>
      <div className="scrollTo" onClick={() => executeScroll(reviewsRef)}>
        <div>Reviews</div>
        <MdChevronRight />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 40px 0 30px;
  .scrollTo {
    cursor: pointer;
    color: #333;
    font-weight: 400;
    padding: 18px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
  }
  .scrollTo:first-of-type {
    border-top: 1px solid #ccc;
  }
  .scrollTo:hover {
    color: #fe4f00;
  }
  svg {
    font-size: 20px;
  }
`;

export default QuickScroll;
