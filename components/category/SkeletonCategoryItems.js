import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function SkeletonCategoryItems({ numberOfItems }) {
  return (
    <Wrapper className="flex flex-wrap my-5 placeholder-category-items-wrapper">
      {Array(numberOfItems)
        .fill(0, 0, numberOfItems)
        .map((_, i) => (
          <div className="skeleton-item-wrapper mb-8" key={i}>
            <div
              className="skeleton-item"
              style={{
                backgroundColor: "#eee",
                height: "400px"
              }}
            ></div>
          </div>
        ))}
    </Wrapper>
  );
}
